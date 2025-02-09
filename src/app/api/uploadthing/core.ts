import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ userId: "fakeId" });

const handleAuth = (req: Request) => {
    const { userId } = auth(req);
    if (!userId) throw new UploadThingError("Unauthorized");
    return { userId };
};

export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(({ req }) => handleAuth(req))
        .onUploadComplete(() => {}),

    courseAttachment: f(["text", "image", "video", "audio", "pdf"])
        .middleware(({ req }) => handleAuth(req))
        .onUploadComplete(() => {}),

    chapterVideo: f({ video: { maxFileSize: "2GB", maxFileCount: 1 } }) // Ограничил до 2GB
        .middleware(({ req }) => handleAuth(req))
        .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
