"use client";
import { Button } from "@/components/ui/button";
import React from "react";

interface ChapterActionProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

const ChapterAction = ({ disabled, courseId, chapterId, isPublished }: ChapterActionProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <Button onClick={() => {}} />
    </div>
  );
};

export default ChapterAction;
