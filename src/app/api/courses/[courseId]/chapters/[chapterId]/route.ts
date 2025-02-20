  import { db } from "@/lib/db";
  import { auth } from "@clerk/nextjs/server";
  import { NextResponse } from "next/server";
  import Mux from "@mux/mux-node";
  const { Video } = new Mux(process.env.MUX_TOKEN_ID!, process.env.MUX_TOKEN_SECRET!);
      
  export async function PATCH(req: Request, { par ams }: { params: { courseId: string; chapterId: string } }) {
    try {
      const { userId } = await auth();
      const { isPublished, ...values } = await req.json();

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

      const chapter = await db.chapter.update({
        where: {
          id: params.chapterId,
          courseId: params.courseId,
        },
        data: {
          ...values,
        },
      });
      if (values.videoUrl) {
        const existingMuxData = await db.muxData.findFirst({
          where: {
            chapterId: params.chapterId,
          },
        });

        if (existingMuxData) {

          await Video.Assets.del(existingMuxData.assetId);
          await db.muxData.delete({
where: {
  id:existingMuxData.id 
}

          })
        }

const asset = await   Video.Assets.create({
input : values.videoUrl,
playback_policy: "public  " 
test: false

})

  


      }

      return NextResponse.json(chapter);
    } catch (error) {
      console.error("[COURSES_CHAPTER_ID]", error);
      return new NextResponse("Internal server error", { status: 500 });
    }
  }
