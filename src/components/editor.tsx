"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

export const Edtor =
  () =>
  ({ onChange, value }: EditorProps) => {
    const ReactQuil = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
  };
