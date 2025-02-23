import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import { getProgress } from "./getProgress";

type CourseWithProgressWithCategory = Course & {
  Category: Category | null; // Поменял 'category' на 'Category'
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
        title: title ? { contains: title } : undefined, // Добавляем проверку для пустого title
        categoryId, // Фильтрация по categoryId
      },
      include: {
        Category: true, // Заменил 'category' на 'Category'
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
        // Проверка наличия категории и глав
        const validCategory = course.Category ?? null; // Если категории нет, присваиваем null
        const validChapters = course.chapters.length > 0 ? course.chapters : []; // Если глав нет, присваиваем пустой массив

        // Если покупка не найдена, прогресс равен null
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
