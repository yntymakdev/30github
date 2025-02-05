'use client';

import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel,FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' })
});

export default function CreatePage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ''
        }
    });

    const {isValid, isSubmitting } = form.formState;

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    return (
        <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6'>
            <div>
                <h1 className='text-2xl'>Create Page</h1>
                <p className='text-sm text-slate-600'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet atque dignissimos est itaque neque, odit quis tempore ullam voluptate!
                </p>
            </div>

            <FormProvider {...form}>
                <form className='space-y-8 mt-8' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course title</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isSubmitting}
                                        placeholder='e.g Advanced web development'
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>What will you teach in this course?</FormDescription>

                            </FormItem>
                        )}
                    />

                    <div className='flex items-center gap-x-2'>
                        <Link href='/'>
                            <Button type='button' variant='ghost'>
                                Cancel
                            </Button>
                        </Link>
                        <Button type='submit' disabled={!isValid || isSubmitting}>
                            Continue
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
