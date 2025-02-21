import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { AlertCircle } from "lucide-react";
import React from "react";
import { AlertDialogHeader } from "../ui/alert-dialog";

interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

const ConfirmModal = ({ children, onConfirm }: ConfirmModalProps) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader><AL</AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ConfirmModal;
