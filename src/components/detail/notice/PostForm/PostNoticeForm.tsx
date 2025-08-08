import TypeSelector from "./TypeSelector";
import PermissionSelector from "./PermissionSelector";
import TitleInput from "./TitleInput";
import ContentInput from "./ContentInput";
import FeeSection from "./FeeSection";
import SubmitButton from "./SubmitButton";
import Header from "../../header";
import Notice from "../../notice";
import Tabs from "../../tabs";
import ImageAttachment from "./ImageAttachment";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const PostScheduleForm = () => {
  const navigate = useNavigate();
  const { crewId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("regular");
  const [isRequired, setIsRequired] = useState(true);
  const [fee, setFee] = useState("");
  const [allowComment, setAllowComment] = useState(false);
  const [allowPrivateComment, setAllowPrivateComment] = useState(false);
  const [allowShare, setAllowShare] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      await queryClient.invalidateQueries({ queryKey: ["notices"] });
      await queryClient.invalidateQueries({ queryKey: ["notices", crewId] });
      await queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.some(
            (key) => typeof key === "string" && key.includes("notice")
          ),
      });

      alert("등록 성공!");
      navigate(`/crew/${crewId}/notice`);
    } catch (err) {
      console.error("등록 실패:", err);
      alert("등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  function setImages(_files: File[]): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mt-12 shadow-none">
        <Header />
        <Tabs />
      </div>
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1200px] space-y-6 py-6">
          <Notice />
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-2xl font-bold mb-7 mt-4 px-2 lg:px-6">
              크루 공지 등록하기
            </div>
            <div className="space-y-6 px-2 lg:px-6">
              <TypeSelector {...{ type, setType, isRequired, setIsRequired }} />
              <PermissionSelector
                {...{
                  allowComment,
                  setAllowComment,
                  allowPrivateComment,
                  setAllowPrivateComment,
                  allowShare,
                  setAllowShare,
                }}
              />
              <TitleInput onValueChange={setTitle} />
              <ContentInput onValueChange={setContent} />
              <FeeSection {...{ fee, setFee }} />
              <ImageAttachment onValueChange={setImages} />
              <SubmitButton onClick={handleSubmit} disabled={isSubmitting} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostScheduleForm;
