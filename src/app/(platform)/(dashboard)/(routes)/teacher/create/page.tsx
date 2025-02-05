'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
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
      <div>
        <h1>Create Page</h1>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <input
              type="text"
              {...form.register('title')}
              placeholder="Enter title"
          />
          {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}

          <button type="submit">Submit</button>
        </form>
      </div>
  );
}
