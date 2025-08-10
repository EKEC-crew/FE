import { useEffect, useRef, useState } from "react";
import cameraIcon from "../../../assets/icons/ic_line_Camera.svg";
import defaultProfile from "../../../assets/logo/defaultProfileImg.svg";

interface ProfileImageUploadProps {
  value: File | null | undefined;
  onChange: (file: File | null) => void;
  sizeRem?: number; // 원형 프리뷰 크기 (rem)
}

export default function ProfileImageUpload({
  value,
  onChange,
  sizeRem = 8.5, // 대략 136px
}: ProfileImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // File → ObjectURL 미리보기 생성/정리
  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreview(null);
  }, [value]);

  const openFileDialog = () => inputRef.current?.click();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange(file);
  };

  return (
    <div className="flex justify-center mb-4">
      <div
        className="relative"
        style={{ width: `${sizeRem}rem`, height: `${sizeRem}rem` }}
      >
        <img
          src={preview ?? defaultProfile}
          alt="프로필 이미지"
          className="w-full h-full rounded-full object-cover border border-[#E5E6EB]"
        />
        <button
          type="button"
          onClick={openFileDialog}
          aria-label="프로필 이미지 업로드"
          className="absolute -bottom-1 -right-1 w-12 h-12 bg-[#3A3ADB] border-[4px] border-white rounded-full flex items-center justify-center shadow-md cursor-pointer"
        >
          <img src={cameraIcon} alt="" />
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>
    </div>
  );
}
