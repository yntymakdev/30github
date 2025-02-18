"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import ReactQuill from "react-quill";

interface PreviewProps {
  value: string;
}

export const Edtor =
  () =>
  ({ value }: PreviewProps) => {
    const ReactQuil = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

    return <ReactQuill theme="bubble" value={value} readOnly />;
  };
