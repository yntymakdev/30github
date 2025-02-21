"use client";
import React from "react";

interface ChapterActionProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

const ChapterAction = ({ disabled, courseId, chapterId, isPublished }: ChapterActionProps) => {
  return <div>ChapterAction</div>;
};

export default ChapterAction;
