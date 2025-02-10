"use client";
import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {Course} from "@prisma/client";


interface CategoryFormProps {
    initialData:  Course;
    options: {label: string; value: string}[];
    courseId: string;
}

const formSchema = z.object({
    categoryId: z.string().min(1),
});

export const CategoryForm = ({ initialData, courseId,options }: CategoryFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: initialData?.categoryId ?? ""
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

        const selectedOption = options.find(option => option.value === initialData.categoryId);

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Des  cription
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? <>Cancel</> : <><Pencil className="h-4" /> Edit Description</>}
                </Button>
            </div>

            {
                !isEditing && (
                    <p className={cn(
                        'text-sm mt-2',
                        !initialData.categoryId ? 'text-slate-500 italic' : ''
                    )}>
                        {selectedOption?.label || 'No Category'}
                    </p>
                )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea disabled={isSubmitting} placeholder="Description Page" {...field} />
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
