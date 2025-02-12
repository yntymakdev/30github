'use client';
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

const formSchema = z.object({
    url: z.string().min(1),
});

interface AttachmentFormProps {
    initialData: Course & { attachments: Attachment[] };
    courseId: string;
}

export const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const toggleEdit = () => setIsEditing((current) => !current);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/attachments`, values);
            toast.success("Course updated!");
            toggleEdit();
            router.refresh();
        } catch (error: any) {
            toast.error(`Ошибка при обновлении курса: ${error.message}`);
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Attachments
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <PlusCircle className="w-5 h-5 mr-2" />
                            Add a File
                        </>
                    )}
                </Button>
            </div>

            {/* Проверяем, есть ли attachments */}
            {initialData.attachments.length === 0 && !isEditing && (
                <p className="text-sm mt-2 text-slate-500 italic">
                    No attachment yet
                </p>
            )}

            {/* Отображаем FileUpload только если isEditing true */}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseAttachment"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ url });
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Add anything your students might need to complete the course
                    </div>
                </div>
            )}
        </div>
    );
};
