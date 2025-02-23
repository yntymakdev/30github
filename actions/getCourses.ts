import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import { getProgress } from "./getProgress";

type CourseWithProgressWithCategory = Course & {
  Category: Category | null;
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
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: title ? { contains: title } : undefined,
        categoryId,
      },
      include: {
        Category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchase: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
      courses.map(async (course) => {
        const validCategory = course.Category ?? null;
        const validChapters = course.chapters.length > 0 ? course.chapters : [];
        if (course.purchase.length === 0) {
          return {
            ...course,
            Category: validCategory,
            chapters: validChapters,
            progress: null,
          };
        }

        const progressPercentPage = await getProgress(userId, course.id);

        return {
          ...course,
          Category: validCategory,
          chapters: validChapters,
          progress: progressPercentPage,
        };
      })
    );

    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
