import { useRef, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

interface ContentInputProps {
  content?: string;
  setContent?: (content: string) => void;
}

const ContentInput = ({ content = "", setContent }: ContentInputProps) => {
  const editorRef = useRef<Editor>(null);

  const handleChange = () => {
    const html = editorRef.current?.getInstance().getHTML() || "";
    setContent?.(html);
  };

  // content prop이 변경될 때 에디터 내용 업데이트
  useEffect(() => {
    if (
      editorRef.current &&
      content !== editorRef.current.getInstance().getHTML()
    ) {
      editorRef.current.getInstance().setHTML(content);
    }
  }, [content]);

  return (
    <div>
      <div className="font-bold mb-2">
        본문 입력<span className="text-red-500 text-base">*</span>
      </div>
      <div className="mb-6">
        <Editor
          ref={editorRef}
          initialValue=""
          height="400px"
          useCommandShortcut
          hideModeSwitch={true}
          onChange={handleChange}
          toolbarItems={[
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task", "indent", "outdent"],
            ["table", "image", "link"],
            ["code", "codeblock"],
          ]}
        />
      </div>
    </div>
  );
};

export default ContentInput;
