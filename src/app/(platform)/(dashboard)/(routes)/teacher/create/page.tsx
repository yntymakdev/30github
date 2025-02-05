'use client';

import { z } from 'zod';
import {Form, useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


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

  const { errors } = form.formState;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
      <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-ful'>
          <div >



        <h1 className='text-2xl'>Create Page</h1>
<p className='text-sm text-slate-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet atque dignissimos est itaque neque, odit quis tempore ullam voluptate!</p>
          </div>

        <Form {...form}>
            <form  className='space-y-8 mt-8'onSubmit={form.handleSubmit(onSubmit  )}  ></form>
       <FormField control={form.control} name='title' render={({field}) => (
           <FormItem>
               <FormLabel>

                   Course title
               </FormLabel>

           </FormItem>

       )}></FormField>

          <input
              type="text"
              {...form.register('title')}
              placeholder="Enter title"
          />
          {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}

          <button type="submit">Submit</button>
        </Form>
      </div>
  );
}
