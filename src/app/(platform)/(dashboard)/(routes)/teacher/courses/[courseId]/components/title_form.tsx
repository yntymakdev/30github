"use client";
import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

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
          <>
            Cancel <Pencil className="h-4" />
          </>
        ) : (
          <Pencil className="h-4" />
        )}
      </Button>
      {isEditing && (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <input {...form.register("title")} className="border p-2 rounded" placeholder="Enter course title" />
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Save
          </Button>
        </form>
      )}
    </div>
  );
};
