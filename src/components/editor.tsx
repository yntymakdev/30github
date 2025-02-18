"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import ReactQuill from "react-quill";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

export const Edtor =
  () =>
  ({ onChange, value }: EditorProps) => {
    const ReactQuil = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

    return (
      <div className="bg-white">
        <ReactQuill theme="show" value={value} onChange={onChange} />
      </div>
    );
  };
