import { db } from "@/lib/db";
import Categories from "./components/Categories/Categories";
import SearchInput from "@/components/SearchInput";

const SearchPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
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
