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
  console.log("Количество курсов:", items.length); // Проверяем, есть ли данные

  return (
    <div className="block">
      {" "}
      {/* Убедимся, что контейнер не скрыт */}
      {items.length > 0 ? (
        items.map((el) => (
          <div key={el.id} className="p-4 border-b">
            <h2 className="text-lg font-bold">{el.title}</h2>
            {el.category && <p className="text-sm text-gray-600">{el.category.name}</p>}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Нет курсов для отображения</p>
      )}
    </div>
  );
};
