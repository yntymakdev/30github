"use client";
import { Category } from "@prisma/client";
import React from "react";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};
export const CourseList = () => {
  return <div>CourseList</div>;
};
