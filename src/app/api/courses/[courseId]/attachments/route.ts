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

        const courseOwner = await db.course.findUnique({ where: { id: params.courseId } });
        if (!courseOwner) {
            return new NextResponse('Not Found', { status: 404 });  // изменен статус с 401 на 404
        }

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
        console.log('COURSE_ID_ATTACHEMENTS', err);
        return new NextResponse('Internal server error', { status: 500 });
    }
}
