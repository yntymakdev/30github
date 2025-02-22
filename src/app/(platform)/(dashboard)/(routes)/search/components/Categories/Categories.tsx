"use client";

import { Category } from "@prisma/client";
import React from "react";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
} from "react-icons/fc";
import { IconType } from "react-icons";
import CategoryItem from "./CategoryItem";

interface CategiresProps {
  items: Category[];
}

const iconMap: Record<string, IconType> = {
  "I-T": FcMusic,
  Islam: FcOldTimeCamera, // Убедитесь, что имя категории совпадает
  "Software Engineering": FcSalesPerformance,
  Engineering: FcEngineering, // Исправьте пробел в имени
  Technologies: FcFilmReel, // Исправьте пробел в имени
  "Robot Technik": FcMultipleDevices,
  Accounting: FcMultipleDevices, // Исправьте пробел в имени
};

const Categories = ({ items }: CategiresProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => {
        const IconComponent = iconMap[item.name]; // Получаем иконку для категории
        return (
          <CategoryItem
            key={item.id}
            label={item.name}
            icon={IconComponent || FcMusic} // Подставляем дефолтную иконку, если не нашли
            value={item.id}
          />
        );
      })}
    </div>
  );
};

export default Categories;
