import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
  try {
    const { userId } = await auth();
    console.log("User ID:", userId);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

    const muxData = await db.muxData.findUnique({ where: { chapterId: params.chapterId } });

    if (!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl) {
      return new NextResponse("Missing required  fields", { status: 400 });
    }

    const publishChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: { isPublished: true },
    });
    return NextResponse.json(publishChapter);
  } catch (error) {
    console.error("[CHAPTER_PUBLISH]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
