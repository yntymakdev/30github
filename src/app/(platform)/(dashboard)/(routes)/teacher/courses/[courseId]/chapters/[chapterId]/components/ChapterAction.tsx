"use client";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

interface ChapterActionProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

const ChapterAction = ({ disabled, courseId, chapterId, isPublished }: ChapterActionProps) => {
  const onDelete = async () => {
    try {
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button onClick={() => {}} disabled={disabled} variant="outline" size="sm">
        {isPublished ? "Unpublished" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={() => {}}>
        <Button size="sm">
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterAction;
