import { Course } from "@prisma/client";
import React from "react";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

export const CourseCard = ({ id, title, price, imageUrl, chaptersLength, progress, category }: CourseCardProps) => {
  return <div>CourseCard</div>;
};
