"use client";
import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
}

export const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;
  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/edit`, values);
      toggleEdit();
    } catch (error) {
      console.error("Ошибка при обновлении курса:", error);
    }
    console.log(values);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">Course Title</div>
      <Button variant="ghost" onClick={toggleEdit}>
        {isEditing ? (
          <>Cancel</>
        ) : (
          <>
            <Pencil className="h-4" />
            Edit Title
          </>
        )}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, temporibus.
      </Button>

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="Enter course title..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting || !isValid} className="mt-2">
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
