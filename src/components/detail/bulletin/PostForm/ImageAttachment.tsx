import React, { useState, useRef, useEffect } from "react";
import uploadIc from "../../../../assets/icons/ic_upload.svg";

interface ImageAttachmentProps {
  onValueChange?: (files: File[]) => void;
}

const ImageAttachment: React.FC<ImageAttachmentProps> = ({ onValueChange }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onValueChange?.(selectedFiles);
  }, [selectedFiles, onValueChange]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (selectedFiles.length + files.length <= 5) {
      setSelectedFiles([...selectedFiles, ...files]);
    } else {
      alert("최대 5개까지만 첨부할 수 있습니다.");
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      {/* 타이틀 */}
      <div className="flex items-center space-x-2">
        <h3 className="text-sm font-medium text-gray-900">이미지 첨부</h3>
        <span className="text-xs text-red-500">
          지원되는 파일을 최대 5개까지 업로드하세요.
        </span>
      </div>

      {/* 첨부 이미지 리스트 */}
      {selectedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center border border-gray-300 rounded-md px-3 py-1 bg-white"
            >
              <span className="text-sm text-gray-700 mr-2 truncate max-w-[100px]">
                {file.name}
              </span>
              <button
                onClick={() => removeFile(index)}
                className="text-gray-500 hover:text-red-500 text-lg leading-none"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 파일 첨부 버튼 */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          onClick={handleAttachClick}
          className="flex items-center gap-2 px-4 py-2 border rounded-md"
          style={{
            borderColor: "#3A3ADB",
            backgroundColor: "#ECECFC",
            color: "#3A3ADB",
          }}
        >
          <img src={uploadIc} alt="upload" className="w-4 h-4" />
          <span className="text-sm font-medium">파일 추가</span>
        </button>
      </div>
    </div>
  );
};

export default ImageAttachment;
