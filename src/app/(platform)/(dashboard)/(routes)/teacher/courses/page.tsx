import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function CoursesPage() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }
  const courses = await db.course.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
}
