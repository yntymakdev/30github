import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});
const { assets } = mux.video;

export async function DELETE(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
  try {
    // Проверка авторизации
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Поиск курса по ID и пользователю
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    // Логирование для отладки
    console.log(`Deleting course with ID: ${params.courseId}`);
    console.log(`Deleting chapters for course: ${params.courseId}`);

    // Удаление активов Mux для каждой главы
    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        try {
          console.log(`Deleting asset with ID: ${chapter.muxData.assetId}`);
          await assets.delete(chapter.muxData.assetId);
        } catch (err) {
          console.error(`Error deleting asset: ${chapter.muxData.assetId}`, err);
          // Можно вернуть ошибку или продолжить
        }
      }
    }

    // Удаление курса из базы данных
    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });

    console.log(`Deleted course with ID: ${params.courseId}`);
    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.error("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = await auth();
    const { courseId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
