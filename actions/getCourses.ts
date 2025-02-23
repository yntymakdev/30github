import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";

type CourseWithProgrssWithcategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: getCourses): Promise<CourseWithProgrssWithcategory[]> => {
  try {
    const courses = await db.course.findMany(
      {
        where: {
          isPublished: true,
          title: { contains: title },
        },
        categoryId,
      },

      include:{
categoryId: true,
chapters: {
    where: {
        isPublished: true,
    },
    select: {
id: true
    }
},
purchase:{
    where: {
        userId,
    }
}
      },
      orderBy: {
createdAt: "desc", 
      }
    )};
    const coursesWithProgress
 } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return [];
  }
};
