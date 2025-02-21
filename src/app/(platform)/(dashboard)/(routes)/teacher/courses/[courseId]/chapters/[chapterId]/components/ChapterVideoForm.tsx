"use client";
import React, { useState, useEffect, useRef } from "react";
import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import Hls from "hls.js";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({ initialData, courseId, chapterId }: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  // Инициализация HLS.js
  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      const hls = new Hls({
        // Параметры для настройки буферизации
        maxBufferLength: 30, // Максимальная длина буфера
        maxBufferSize: 60 * 1000 * 1000, // Максимальный размер буфера в байтах
        maxMaxBufferLength: 600, // Максимальная длина буфера в секундах
      });

      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        hls.loadSource(initialData?.muxData?.playbackId || "");
      });

      return () => {
        hls.destroy();
      };
    }
  }, [initialData?.muxData?.playbackId]);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Chapter Video
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <VideoIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <video ref={videoRef} controls className="w-full h-full">
              {/* Этот источник будет загружен через HLS.js */}
            </video>
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">Upload this chapter's video</div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if the video does not appear.
        </div>
      )}
    </div>
  );
};
