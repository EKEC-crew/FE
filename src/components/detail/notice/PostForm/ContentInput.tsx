import { useEffect, useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

interface ContentInputProps {
  onValueChange: (value: string) => void;
  initialValue?: string;
}

const ContentInput: React.FC<ContentInputProps> = ({ onValueChange, initialValue }) => {
  const editorRef = useRef<Editor>(null);
  const [content, setContent] = useState("");

  const handleChange = () => {
    const html = editorRef.current?.getInstance().getHTML() || "";
    setContent(html);
    onValueChange(html);
  };

  useEffect(() => {
    if (typeof initialValue === "string") {
      setContent(initialValue);
      const inst = editorRef.current?.getInstance();
      if (inst) {
        inst.setHTML(initialValue);
      }
      onValueChange(initialValue);
    }
  }, [initialValue]);

  // placeholder 텍스트 제거
  useEffect(() => {
    const timer = setTimeout(() => {
      const placeholders = document.querySelectorAll('.toastui-editor-md-placeholder, .toastui-editor-ww-placeholder');
      placeholders.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });
      
      const modeSwitches = document.querySelectorAll('.toastui-editor-mode-switch');
      modeSwitches.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="font-bold mb-2">
        본문 입력<span className="text-red-500 text-base">*</span>
      </div>
      <div className="mb-6">
        <Editor
          ref={editorRef}
          initialValue={content}
          height="400px"
          useCommandShortcut
          hideModeSwitch={true}
          onChange={handleChange}
          placeholder="내용을 입력해주세요..."
          toolbarItems={[
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task", "indent", "outdent"],
            ["table", "image", "link"],
            ["code", "codeblock"],
          ]}
        />
      </div>

      {/* 미리보기 영역 (실시간 반영) */}
      <div className="mt-4 rounded-2xl bg-[#eef0f5] p-6">
        <div
          className="text-[15px] leading-7 text-gray-800"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default ContentInput;