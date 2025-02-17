import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request
{params}: {params: {courseId:string;chapterId:string}}){

    try {
const {userId} = await auth()
const values  = await req.json()
if(!userId)  {
    return new NextResponse('Unautorized', {status:401})
}       
    } 
    const ownCourse  = await db.course.findUnique({
        where: {    

            id:params.courseId,
            userId
        }
    })
    if(!ownCourse)  {
        return new NextResponse('Unautorized', {status:401})
    }       
const chapter = await db.chapter.update({
    where: {
        id:params.chapterId,
        courseId:params.courseId
    },
    data:{
        ...values
    }
})

}
    catch (error) {
     console.log("[COURSES_CHAPTER_ID]", error);
     return  new NextResponse('Internal server error', {status: 500})
        
    }
};
