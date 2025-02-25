import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { getProgress } from "../../../../../actions/getProgress";

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

const porgresCount = await getProgress(userId,course.id)

  return <div className="h-full">
  <div className="hidden md:flex-full w-full flex-col fixed inset-y-0 z-50"></div>
    <main>
    {children}
  </main>
    </div>;

export default CourseLayout;
