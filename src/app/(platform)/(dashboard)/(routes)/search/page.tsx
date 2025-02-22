"use client";

import { db } from "@/lib/db";
import Categories from "./components/Categories/Categories";

const SearchPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div>
      <div className="p-6">
        <Categories items={categories} />
      </div>
    </div>
  );
};
