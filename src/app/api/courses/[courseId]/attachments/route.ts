export async function POST(
    req:Request,
        {params}: {params: courseId:string}
){
    try {
const {userId} = auth();
const {url} = await  req.json()
        if(!userId){

        }
    }catch(err){}
}