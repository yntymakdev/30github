import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/icon-badge";
import { LayoutDashboard } from "lucide-react";
import { TitleForm } from "./components/TitleForm";
import { DescriptionForm } from "@/app/(platform)/(dashboard)/(routes)/teacher/courses/[courseId]/components/DescriptionForm";
import {ImageForm} from "@/app/(platform)/(dashboard)/(routes)/teacher/courses/[courseId]/components/ImageForm";

const CourseIdPagePage = async ({ params }: { params: { courseId: string } }) => {
    const { userId } = await auth();
    if (!userId) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
        },
    });

    if (!course) {
        return redirect("/");
    }

    const categories = await db.category.findMany({
        orderBy:{
            name: 'asc',
        }
    })
    console.log(categories)
    if(!course){
        return redirect("/");
    }

    const requiredFields = [course.title, course.description, course.imageUrl, course.price, course.categoryId];
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">Course Setup</h1>
                    <span className="text-sm text-slate-700">Completed fields {completionText}</span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">Customize your course</h2>
                    </div>
                    <TitleForm
                        initialData={{
                            title: course.title ?? "",  // Ensure title is not null
                        }}
                        courseId={course.id}
                    />
                    <DescriptionForm
                        initialData={{
                            description: course.description ?? "",  // Ensure description is not null
                        }}
                        courseId={course.id}
                    /> <ImageForm
                        initialData={course}
                        courseId={course.id}
                    />
                </div>
            </div>
        </div>
    );
};

export default CourseIdPagePage;
