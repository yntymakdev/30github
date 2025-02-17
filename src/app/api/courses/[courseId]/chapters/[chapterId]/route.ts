import { NextResponse } from "next/server";

export async function PATCH(req: Request
{params}: {params: {courseId:string;chapterId:string}}){

    try {
const {userId} =         
    } catch (error) {
     console.log("[COURSES_CHAPTER_ID]", error);
     return  new NextResponse('Internal server error', {status: 500})
        
    }
};
