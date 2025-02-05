'use client';

import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {Input} from "@/components/ui/input";

const formSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' })
});

export default function CreatePage() {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting }
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ''
        },
        mode: 'onChange'
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full">
            <div>
                <h1 className="text-2xl">Create Page</h1>
                <p className="text-sm text-slate-600">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet atque dignissimos est itaque neque, odit quis tempore ullam voluptate!
                </p>
            </div>

            <form className="space-y-8 mt-8" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Course Title</label>
                            <Input
                                {...field}
                                disabled={isSubmitting}
                                placeholder="e.g Advanced web development"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                            <p className="text-sm text-gray-500">What will you teach in this course?</p>
                        </div>
                    )}
                />

                <div className="flex items-center gap-x-2">
                    <Link href="/">
                        <Button type="button" variant="ghost">
                            Cancel
                        </Button>
                    </Link>
                    <Button type="submit" disabled={!isValid || isSubmitting}>
                        Continue
                    </Button>
                </div>
            </form>
        </div>
    );
}
