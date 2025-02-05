'use client';

import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
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

    const { isValid, isSubmitting, errors } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
try {
    const response = await axios.post('/api/courses,values');
    router.push(`/teacher/courses/${response.data.id}`);
}catch(error) {
    console.log('Something went wrong');

}
    };

    return (
        <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6'>
            <div>
                <h1 className='text-2xl'>Name your course</h1>
                <p className='text-sm text-slate-600'>
                    What would you like to name your course? Don't worry, you can change it later.
                </p>

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
                                    {errors.title && <FormMessage>{errors.title.message}</FormMessage>}
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
        </div>
    );
}
