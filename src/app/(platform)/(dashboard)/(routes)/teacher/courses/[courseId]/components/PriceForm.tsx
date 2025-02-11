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
import {formatPrice} from "@/lib/format";

const formSchema = z.object({
    price: z.coerce.number(),
});
interface PriceForm {
    initialData: Course
    courseId: string;
}

export const PriceForm = ({ initialData, courseId }: PriceForm) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: initialData?.price || '',
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
                Course Price
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? <>Cancel</> : <><Pencil className="h-4" /> Edit Price</>}
                </Button>
            </div>

            {
                !isEditing && (
                    <p className={cn(
                        'text-sm mt-2',
                        !initialData.price && 'text-slate-500 italic'                    )}>
                        {initialData.price ? formatPrice(initialData.price) : 'No Price'}
                    </p>
                )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type='number' step='0.01' disabled={isSubmitting} placeholder="Price Page" {...field} />
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
