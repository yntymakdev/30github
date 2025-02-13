import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";

export async function DELETE(
    req: Request,
    {params}: {params: {courseId:string,attachmentId:string}}
){
    try {
const {userId} = await  auth()
        return new NextResponse('Unauthorized', {status: 401})
    }

    const courseOwner = await  db.course.findUnique({
        where:{
            id: params.courseId,
            userId:userId

        }
    })

    catch (error) {
        console.error('ATTACHMENT_ID', error);
        return new NextResponse('Internal server error', {status:500});
    }
}