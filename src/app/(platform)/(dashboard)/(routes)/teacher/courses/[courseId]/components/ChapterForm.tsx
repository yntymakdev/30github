"use client";
import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {Pencil, PlusCircle} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {Course} from "@prisma/client";
import {Input} from "@/components/ui/input";

const formSchema = z.object({
    title: z.string().min(1),
});

interface ChapterFormProps {
    initialData:Course
    courseId: string;
}

export const ChapterForm = ({ initialData, courseId }: ChapterFormProps) => {
    const [isCreating,setIsCreating] = useState(false);
    const [Isupdating, setIsupdating] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });

    const { isSubmitting, isDirty } = form.formState;
    const toggleCreating = () => {
    setIsCreating((current) => !current);
    }
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters`, values);
            toast.success("Chapter created!");
            toggleCreating();
            router.refresh();
        } catch (error) {
            console.error("Ошибка при обновлении курса:", error);
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter Customize
                <Button variant="ghost" onClick={toggleCreating}>
                        {isCreating ? <>Cancel</> : <><PlusCircle className="h-4" /> Add a chapter</>}
                </Button>
            </div>

            {
                !isCreating && (
                    <p className={cn(
                        'text-sm mt-2',
                        !initialData.description ? 'text-slate-500 italic' : ''
                    )}>
                        {initialData.description || 'No chapters'}
                    </p>
                )}
            {isCreating && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input disabled={isSubmitting} placeholder="Description Page" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                            <Button type="submit" disabled={isSubmitting || !isDirty} className="mt-2">
                                Create
                            </Button>
                    </form>
                </Form>
            )}
            {
                !isCreating &&(
                    <div>

                        No Chapters
                    </div>
                )}
            {
                !isCreating &&(


                )
            }
        </div>
    );
};
