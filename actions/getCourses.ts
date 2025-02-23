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
    const coursesWithProgress: CourseWithProgrssWithcategory[] = await
    Promise.all(
      CourseIdPage.map(async course => {

if(course.purchase.length === 0){
  return {

    ...course,
    progress: null
  }
}

})
)
return CourseWithProgress;
 } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return [];
  }
};
