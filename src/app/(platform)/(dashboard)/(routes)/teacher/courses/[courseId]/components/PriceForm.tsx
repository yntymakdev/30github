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

const formSchema = z.object({
    description: z.string().min(1, "Description is required"),
});

interface DescriptionFormProps {
    initialData: {
        description: string;
    };
    courseId: string;
}

export const DescriptionForm = ({ initialData, courseId }: DescriptionFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter(); // ✅ Используем useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description ?? ""
        },
    });

    const { isSubmitting, isDirty } = form.formState;
    const toggleEdit = () => setIsEditing((current) => !current);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course updated!");
            toggleEdit();
            router.refresh(); // ✅ Теперь работает
        } catch (error) {
            console.error("Ошибка при обновлении курса:", error);
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Description
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? <>Cancel</> : <><Pencil className="h-4" /> Edit Description</>}
                </Button>
            </div>

            {
                !isEditing && (
                    <p className={cn(
                        'text-sm mt-2',
                        !initialData.description ? 'text-slate-100 italic' : ''
                    )}>
                        {initialData.description || 'No description'}
                    </p>
                )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
                        <FormField
                            control={form.control}
                            name="description"
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
