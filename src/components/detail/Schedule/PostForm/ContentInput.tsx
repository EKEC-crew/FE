import "../../../../index.css";
import { useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const ContentInput = () => {
  const editorRef = useRef<Editor>(null);
  const [content, setContent] = useState("");

  const handleChange = () => {
    const html = editorRef.current?.getInstance().getHTML() || "";
    setContent(html);
  };

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

      <div
        className="border border-gray-300 p-2"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default ContentInput;
