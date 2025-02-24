"use client";
import { Category, Course } from "@prisma/client";
import React from "react";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CourseListProps {
  items: CourseWithProgressWithCategory[];
}

export const CourseList = ({ items }: CourseListProps) => {
  console.log("Количество курсов:", items.length);

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg-grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard />
        ))}
      </div>
      <div>
        {items.length=== 0 && (
          
        )          <CourseCard />
        ))}
      </div>
    </div>
  );
};
