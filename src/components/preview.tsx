import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  const editorStyles = {
    border: "1px solid #ddd", // Пример стиля
    minHeight: "200px", // Пример стиля
  };

  return (
    <Editor
      readOnly
      toolbarHidden
      editorStyle={editorStyles} // Передача объекта стилей
    />
  );
};
