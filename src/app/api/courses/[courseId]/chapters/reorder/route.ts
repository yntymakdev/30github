import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

export async function PUT(
    req: Request,{params}: {params: {courseId: string}}
){
    try {
const {userId} = await auth()

        if(!userId){
            return new NextResponse('Unauthorized', {status:401})
        }
        const {list }= await  req.json()

    }catch (error){
        console.log('[REORDER]', error);
        return new NextResponse('Internal Server Error', {status: 500})
    }
}


