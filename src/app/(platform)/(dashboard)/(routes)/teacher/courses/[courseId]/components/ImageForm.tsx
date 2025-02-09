"use client";
import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {ImageIcon, Pencil, PlusCircle} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import Image from "next/image";
import {FileUpload} from "@/components/file-upload";

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required",
    }),
});

interface ImageFormProps {
    initialData: Course;
    courseId: string;
}

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageUrl: initialData?.imageUrl ?? "",
        },
    });

    const { isSubmitting, isDirty } = form.formState;
    const toggleEdit = () => setIsEditing((current) => !current);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
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
                    {isEditing ? (
                        <>Cancel</>
                    ) : !initialData?.imageUrl ? (
                        <>
                            <PlusCircle className="w-5 h-5 mr-2" />
                            Add an image
                        </>
                    ) : (
                        <>
                            <Pencil className="h-4" /> Edit Image
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
            !initialData.imageUrl ? (
                <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'
                >
                    <ImageIcon className='h-10 w-10 text-slate-500'/>
                </div>
            ) : (
                <div className='relative aspect-video mt-2'>
                    <Image alt='Upload' className='object-cover rounded-md' src={initialData.imageUrl}/>

                </div>
            )
            )}
            {isEditing && (
                <div>
                    <FileUpload  endpoint='courseImage' onChange={(url) => {
                        if(url) {
                            onSubmit({imageUrl: url})
                        }
                    }}
                        />
                                 <div className='text-xs text-muted-foreground mt-4'>
                                     16:9 aspect ralio recommended

                        </div>
                </div>

            )}
        </div>
    );
};
