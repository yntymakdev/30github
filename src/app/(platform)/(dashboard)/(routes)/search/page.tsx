import { db } from "@/lib/db";
import Categories from "./components/Categories/Categories";
import SearchInput from "@/components/SearchInput";
import { getCourses } from "../../../../../../actions/getCourses";
import { auth } from "@clerk/nextjs/server";

const SearchPage = async () => {
  const { userId } = await auth();
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const courses = await getCourses;

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
        <div className="p-6">
          <Categories items={categories} />
        </div>
      </div>
    </>
  );
};
export default SearchPage;
