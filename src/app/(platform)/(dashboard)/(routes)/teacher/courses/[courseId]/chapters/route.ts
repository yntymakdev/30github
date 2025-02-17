import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
    try {
        const { userId } = await auth();
        const { url, title } = await req.json();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const courseOwner = await db.course.findUnique({
            where: { id: params.courseId, userId: userId }
        });
        if (!courseOwner) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const lastChapter = await db.chapter.findFirst({
            where: { courseId: params.courseId },
            orderBy: { position: 'desc' },
        });

        const newPosition = lastChapter ? lastChapter.position + 1 : 1;

        const chapter = await db.chapter.create({
            data: {
                title,
                courseId: params.courseId,
                position: newPosition,
            }
        });

        return NextResponse.json(chapter);
    } catch (err) {
        console.log('[CHAPTERS]', err);
        return new NextResponse('Internal server error', { status: 500 });
    }
}
