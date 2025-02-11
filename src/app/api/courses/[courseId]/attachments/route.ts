import {NextResponse} from "next/server";

export async function POST(
    req:Request,
        {params}: {params: courseId:string}
){
    try {
const {userId} = auth();
const {url} = await  req.json()
        if(!userId){
return new NextResponse('Unauthorized', {status:401});
        }
        const  courseOwner = await  db.course.findUnique({where:{id:params.courseId}});
        if(!courseOwner){
            return new NextResponse('Unautorized', {status:401})
        }

        const attachment = await  db.attachment.create({
            data:{
                url,
                name:url.split('/')[0]
            }
        })
    }catch(err){}
}