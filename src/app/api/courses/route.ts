import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

export async function POST(

    req:Request

) {
    try {
        const {userId} = auth()
        const {title} = await req.json
        if(!userId)
            return new NextResponse("Unauthorized")
    }
    catch (error) {
        error

    }
}