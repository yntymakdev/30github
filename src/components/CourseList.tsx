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
  return <div>{items.map(el) => (
<div key={el.id}>
    {el.title} 
</div>

  )}</div>;
};
