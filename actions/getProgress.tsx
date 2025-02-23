import { db } from "@/lib/db";

export const getProgress = async (userId: string, courseId: string): Promise<number> => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: { courseId: courseId, isPublished: true },
      select: { id: true },
    });

    const publishedChapterId = publishedChapters.map((chapter) => chapter.id);
    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterId,
        },
        isCompleted: true,
      },
    });

    const progressPercentPage = (validCompletedChapters / publishedChapterId.length) * 100;
    return progressPercentPage;
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return 0;
  }
};
