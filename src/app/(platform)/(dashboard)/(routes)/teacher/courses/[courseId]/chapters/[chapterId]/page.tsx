import React from 'react';
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";




const ChapterIdPage =async ({params}: {params:{courseId:string;chapterId:string}}) => {

 const {userId} = await  auth()
    if(!userId){
        return redirect('/')
    }
    const chapter = await  db.chapter.findUnique({
        where: {
            id: params.chapterId,
            courseId: params.courseId
        },
        include:{
            muxData: true
        }

    })

    return (
        <div>
          Chapterid
        </div>
    );
};

export default ChapterIdPage;