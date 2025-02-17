import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request
{params}: {params: {courseId:string;chapterId:string}}){

    try {
const {userId} = await auth()
const values  = await req.json()
if(!userId)         
    } catch (error) {
     console.log("[COURSES_CHAPTER_ID]", error);
     return  new NextResponse('Internal server error', {status: 500})
        
    }
};
