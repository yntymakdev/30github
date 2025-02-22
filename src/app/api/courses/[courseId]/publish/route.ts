export async function PATCH(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
  try {
    console.log("Request started");

    const { userId } = await auth();
    console.log("User ID:", userId);

    const { isPublished, ...values } = await req.json();
    console.log("Request body values:", values);

    if (!userId) {
      console.log("Unauthorized request");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!ownCourse) {
      console.log("Course not found or unauthorized access");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log("Updating chapter...");
    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    if (!chapter) {
      console.log("Chapter not found");
      return new NextResponse("Chapter not found", { status: 404 });
    }

    if (values.videoUrl) {
      console.log("Handling video URL...");
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      if (existingMuxData) {
        console.log("Deleting existing Mux asset:", existingMuxData.assetId);
        await assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      console.log("Creating new Mux asset...");
      const asset = await assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        test: false,
      });

      if (!asset || !asset.id || !asset.playback_ids?.[0]?.id) {
        throw new Error("Failed to create Mux asset");
      }

      console.log("Mux asset created successfully:", asset.id);
      await db.muxData.create({
        data: {
          chapterId: params.chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids[0]?.id,
        },
      });
    }

    console.log("Chapter updated successfully");
    return NextResponse.json(chapter);
  } catch (error) {
    console.error("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
