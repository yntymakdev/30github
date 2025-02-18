"use client";

import dynamic from "next/dynamic";
import { useMemo, useCallback } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor as DraftEditor } from "draft-js";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

export const Editor = ({ onChange, value }: EditorProps) => {
  const [editorState, setEditorState] = useMemo(() => {
    const initialState = value
      ? EditorState.createWithContent(ContentState.createFromText(value))
      : EditorState.createEmpty();
    return [initialState, setEditorState] as const;
  }, [value]);

  const handleChange = useCallback(
    (newEditorState: EditorState) => {
      setEditorState(newEditorState);
      const currentContent = newEditorState.getCurrentContent();
      const currentText = currentContent.getPlainText();
      onChange(currentText); // передаем обновленный текст родительскому компоненту
    },
    [onChange]
  );

  return (
    <div className="bg-white">
      <DraftEditor editorState={editorState} onChange={handleChange} placeholder="Start typing..." />
    </div>
  );
};
