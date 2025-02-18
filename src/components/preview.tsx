"use client";

import dynamic from "next/dynamic";

interface PreviewProps {
  value: string;
}

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const Preview = ({ value }: PreviewProps) => {
  return <ReactQuill theme="bubble" value={value} readOnly />;
};
