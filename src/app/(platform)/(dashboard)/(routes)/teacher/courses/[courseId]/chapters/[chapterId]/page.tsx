import React from 'react';
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";
import Link from "next/link";




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
    if(!chapter){

        return redirect('/')
    }

    const requiredFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl,
    ]

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = (`${completedFields}/${totalFields}`)
    return (
        <div className='p-6'>
            <div className='flex items-center justify-center'>
                <div className='w-full'>
                    <Link href={`/teacher/courses/${params.courseId}`}
                     className=''
                    />

                </div>

            </div>
          Chapterid
        </div>
    );
};

export default ChapterIdPage;