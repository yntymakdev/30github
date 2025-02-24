import { Course } from "@prisma/client";
import Link from "next/link";
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
  return (
    <div>
      <Link href={`/courses/${id}`}>
        <div className="group  hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full"></div>
      </Link>
    </div>
  );
};
