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
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg-grid-cols-3">
        {items.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
      <div></div>
    </div>
  );
};
