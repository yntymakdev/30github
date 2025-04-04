import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/icon-badge";
import { CircleDollarSign, LayoutDashboard, ListChecks, File } from "lucide-react";
import { TitleForm } from "./components/TitleForm";
import { DescriptionForm } from "@/app/(platform)/(dashboard)/(routes)/teacher/courses/[courseId]/components/DescriptionForm";
import { ImageForm } from "@/app/(platform)/(dashboard)/(routes)/teacher/courses/[courseId]/components/ImageForm";
import { CategoryForm } from "@/app/(platform)/(dashboard)/(routes)/teacher/courses/[courseId]/components/CategoryForm";
import { PriceForm } from "@/app/(platform)/(dashboard)/(routes)/teacher/courses/[courseId]/components/PriceForm";
import { AttachmentForm } from "@/app/(platform)/(dashboard)/(routes)/teacher/courses/[courseId]/components/AttachmentForm";
import { ChapterForm } from "@/app/(platform)/(dashboard)/(routes)/teacher/courses/[courseId]/components/ChapterForm";
import Banner from "@/components/bunner";
import Actions from "./components/Actions";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: { id: params.courseId },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({ orderBy: { name: "asc" } });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);
  return (
    <>
      {!course.isPublished && <Banner label="This course is unpublished. It will not be  visible to the students" />}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course Setup</h1>
            <span className="text-sm text-slate-700">Completed fields {completionText}</span>
          </div>
          {/* Add actions here  */}
          <Actions disabled={!isComplete} courseId={params.courseId} isPublished={course.isPublished} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>

            <TitleForm initialData={{ title: course.title ?? "" }} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <ChapterForm initialData={course} courseId={course.id} />
              <p>TODO: Chapters</p>
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm initialData={course} courseId={course.id} />
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resource Attachment</h2>
              </div>
              <AttachmentForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
