'use client'
import { ourFileRouter } from "@/app/api/uploadthing/core";
import {UploadDropzone} from "@/lib/uploadthing";
import toast from "react-hot-toast";

interface FileUpload {
    onChange: (url: string) => void;
    endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({
                               onChange, endpoint
                           }: FileUpload) => {
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].urls);
            }}
            onUploadError={(error: Error) => {
                toast.error(`${error.message}`);
            }}
        />
    );
};
