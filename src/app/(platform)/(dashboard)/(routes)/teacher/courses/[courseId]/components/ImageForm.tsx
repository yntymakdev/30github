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
                <div>
                    current image
                </div>
            )
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input disabled={isSubmitting} placeholder="Image URL" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button type="submit" disabled={isSubmitting || !isDirty} className="mt-2">
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
};
