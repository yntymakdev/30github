import { NextResponse } from "next/server";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } =  await auth();
    const { url } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const courseOwner = await db.course.findUnique({ where: { id: params.courseId,userId: userId } });
    if (!courseOwner) {
      return new NextResponse('Unauthorized', { status: 401 });
    }


const lastChapter = await  db.chapter
    const fileName = url.split('/').pop();
    if (!fileName) {
      return new NextResponse('Invalid file URL', { status: 400 });
    }

    const attachment = await db.attachment.create({
      data: {
        url,
        name: fileName,
        courseId: params.courseId,
      }
    });
    return NextResponse.json(attachment);
  } catch (err) {
    console.log('COURSE_ID_ATTACHMENTS', err);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
