'use client'
import {db} from "@/lib/db";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";

const  CourseIdPagePage  = async({params}: {params:{courseId: string}})=> {

 const {userId} = await  auth()
    if(!userId){
        return  redirect("/");
    }

  const course = await db.course.findUnique({
      where: {
          id: params.courseId,
      }
  })


    return (
    <div>
    CourseIdPagePage
  
    </div>
  );
};


