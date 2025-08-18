import { useEffect, useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

interface ContentInputProps {
  onValueChange: (value: string) => void;
  initialValue?: string;
}

const ContentInput: React.FC<ContentInputProps> = ({ onValueChange, initialValue }) => {
  const editorRef = useRef<Editor>(null);

  // 에디터 내용 변경 시 부모로 값 전달
  const handleChange = () => {
    const inst = editorRef.current?.getInstance();
    const html = inst?.getHTML() ?? "";
    onValueChange(html);
  };

  // initialValue 변경 시 실제 에디터 내용 반영
  useEffect(() => {
    if (typeof initialValue !== "string") return;
    const inst = editorRef.current?.getInstance();
    if (!inst) return;

    // 동일한 값이면 커서 튀는 것 방지
    const current = inst.getHTML();
    if (current !== initialValue) {
      inst.setHTML(initialValue);
    }
    // 부모에도 한번 전달
    onValueChange(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  return (
    <div>
      <div className="font-bold mb-2">
        본문 입력<span className="text-red-500 text-base">*</span>
      </div>
      <div className="mb-6 relative">
        <Editor
          ref={editorRef}
          initialValue={typeof initialValue === "string" ? initialValue : ""}
          previewStyle="vertical"
          height="420px"
          initialEditType="wysiwyg"
          useCommandShortcut
          placeholder="내용을 입력해주세요..."
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ContentInput;
