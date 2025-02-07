import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
    try {
        const { userId } = await auth();
        const { courseId } = params;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Parse the request body to get the updated course data
        const values = await req.json();

        // Update the course in the database
        const course = await db.course.update({
            where: {
                id: courseId,
                userId, // Ensure the course is associated with the authenticated user
            },
            data: {
                ...values, // Update with the new values passed from the request
            },
        });

        return NextResponse.json(course); // Return the updated course data
    } catch (error) {
        console.log("[COURSE_ID]", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}
