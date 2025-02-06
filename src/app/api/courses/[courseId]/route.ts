import {NextResponse} from "next/server";

export async function PATCH(
req:Request
){
    try {
const {userId} = await  auth()
        const {courseId} = await  auth()
        if(!userId){
            return new NextResponse('Unauthorized', {status: 401})
        }
    }
    const course = await  db.course.update
    catch (){
        console.log()
    }


}