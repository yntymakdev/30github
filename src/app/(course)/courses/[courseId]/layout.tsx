import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const CourseLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }
  const course = await db.course.findUnique({ where: { id: params.courseId },
  
  }include:{
    chapters: {
      where: {
        isPublished: true
      },
      include: {
        userPorgress: {
          where:{
            userId
          }
        }
      },
      orderBy: {
        position: "asc"
      }
    }
  }
  });

if(!course){
  redirect('/')
}

const porgrescount = 

  return <div>{children}</div>;

export default CourseLayout;
