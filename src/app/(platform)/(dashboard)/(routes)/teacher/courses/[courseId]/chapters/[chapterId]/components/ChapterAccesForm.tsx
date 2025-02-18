"use client";
import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { Editor } from "@/components/editor";
import { Textarea } from "@/components/ui/textarea";
import { Preview } from "@/components/preview";
import { init } from "next/dist/compiled/webpack/webpack";

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

interface ChapterAccessFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

export const ChapterAccessForm = ({ chapterId, initialData, courseId }: ChapterAccessFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: initialData?.description || "",
    },
  });

  const { isSubmitting, isDirty } = form.formState;
  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Chapter updated!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Ошибка при обновлении курса:", error);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Description
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4" /> Edit Description
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <div className={cn("text-sm mt-2", !initialData.description && "text-slate-500 italic")}>
          {!initialData.description && "No description"}
          {initialData.description && <Preview value={initialData.description} />}
        </div>
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
                    <Editor {...field} />
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
