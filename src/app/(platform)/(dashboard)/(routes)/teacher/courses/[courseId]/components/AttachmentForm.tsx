"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import {ImageIcon, Pencil, PlusCircle} from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {Attachment, Course} from "@prisma/client";
import Image from "next/image";
import {FileUpload} from "@/components/file-upload";

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required",
    }),
});

interface AttachmentFormProps {
    initialData: Course &{attachements: Attachment[]};
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
        } catch (error) {
            console.error("Ошибка при обновлении курса:", error);
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Image
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing  && (
                        <>Cancel</>
                    )}
                        {!isEditing && !initialData.imageUrl && (
                        <>
                            <PlusCircle className="w-5 h-5 mr-2" />
                            Add a File
                        </>
                    )}
                </Button>
            </div>
       <>
           {initialData.attachements.length === 0 && (
               <p className='text-sm mt-2 text-slate=500 italic'
               >
                   Not attachemnt yet
               </p>
           )}
       </>
            )}
            {isEditing && (
                <div>
                    <FileUpload  endpoint='courseAttachment' onChange={(url) => {
                        if(url) {
                            onSubmit({url: url})
                        }
                    }}
                    />
                    <div className='text-xs text-muted-foreground mt-4'>
                      Add anything your students might need to complete the course
                    </div>
                </div>
            )}
        </div>
    );
};
