import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    context: { params?: { courseId?: string; attachmentId?: string } } // ✅ Оборачиваем параметры в `?`
) {
    try {
        const params = context.params; // ✅ Извлекаем `params`

        console.log("📌 params:", params);

        if (!params?.courseId || !params?.attachmentId) {
            return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
        }

        // Получаем userId
        const { userId } =await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Проверяем, является ли пользователь владельцем курса
        const courseOwner = await db.course.findUnique({
            where: { id: params.courseId, userId },
        });
        if (!courseOwner) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Проверяем, существует ли вложение перед удалением
        const attachmentExists = await db.attachment.findUnique({
            where: { id: params.attachmentId },
        });
        if (!attachmentExists) {
            return NextResponse.json({ error: "Attachment not found" }, { status: 404 });
        }

        // Удаляем вложение
        const attachment = await db.attachment.delete({
            where: { id: params.attachmentId },
        });

        return NextResponse.json({ message: "Attachment deleted", attachment });
    } catch (error) {
        console.error("❌ ATTACHMENT_ID ERROR:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
