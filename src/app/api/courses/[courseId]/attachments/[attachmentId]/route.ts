import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";

export async function DELETE(
    req: Request,
    {params}: {params: {courseId:string,attachmentId:string}}
){
    try {
        const {userId} = await auth()
        if (!userId) {
            return new NextResponse('Unauthorized', {status: 401})
        }
        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        })
        if (!courseOwner) {
            return new NextResponse('Unautorized', {status: 401})
        }
        const attachment = await db.attachment.delete({
            where: {
                courseId: params.courseId,
                id: params.attachmentId,
            }
        })

        return NextResponse.json(attachment)
    }
    catch (error) {
        console.error('ATTACHMENT_ID', error);
        return new NextResponse('Internal server error', {status:500});
    }
}