import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { getProgress } from "../../../../../actions/getProgress";
import CourseSideBar from "./components/CourseSideBar";

const CourseLayout = async ({ children, params }: { children: React.ReactNode; params: { courseId: string } }) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
    return null;
  }

  const course = await db.course.findUnique({
    where: { id: params.courseId },
    include: {
      chapters: {
        where: { isPublished: true },
        include: {
          userProgress: {
            where: { userId },
          },
        },
        orderBy: { position: "asc" },
      },
    },
  });

  if (!course) {
    redirect("/");
  }

  const progressCount = await getProgress(userId, course.id);

  return (
    <div className="h-full">
      <div className="hidden md:flex-full w-full flex-col fixed inset-y-0 z-50">
        <CourseSideBar course={course} progressCount={progressCount} />
      </div>
      <main>{children}</main>
    </div>
  );
};

export default CourseLayout;
