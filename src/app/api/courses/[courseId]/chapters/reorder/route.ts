import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

export async function PUT(
    req: Request,{params}: {params: {courseId: string}}
){
    try {
const {userId} = await auth()
    }catch (error){
        console.log('[REORDER]', error);
        return new NextResponse('Internal Server Error', {status: 500})
    }
}