import TypeSelector from "./TypeSelector";
import PermissionSelector from "./PermissionSelector";
import TitleInput from "./TitleInput";
import ContentInput from "./ContentInput";
import FeeSection from "./FeeSection";
import SubmitButton from "./SubmitButton";
import Header from "../../header";
import Notice from "../../notice";
import Tabs from "../../tabs";
import NoticeAbout from "../detail/NoticeAbout";
import ImageAttachment from "./ImageAttachment";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { createNotice } from "../constants";
import { useQuery } from "@tanstack/react-query";
import { fetchMyRole as fetchMyRoleDetail } from "../../constants";

const PostNoticeForm = () => {  
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
  const { data: myRole } = useQuery({
    queryKey: ["myRole", crewId],
    queryFn: () => fetchMyRoleDetail(crewId!),
    enabled: !!crewId,
    staleTime: 1000 * 60 * 2,
    retry: false,
  });
  const canPost = myRole === "LEADER" || myRole === "MANAGER";

  const handleSubmit = async () => {
    console.log("=== 공지 작성 시도 디버깅 ===");
    console.log("crewId:", crewId);
    console.log("myRole 원본:", myRole);
  console.log("myRole type:", typeof myRole);
  console.log("myRole JSON:", JSON.stringify(myRole));
    console.log("myRole 원본:", myRole);
    console.log("canPost:", canPost);
    console.log("title:", title.trim());
    console.log("content length:", content.trim().length);
    console.log("isRequired:", isRequired);
    console.log("allowComment:", allowComment);
    console.log("================================");

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    if (!crewId) {
      alert("크루 ID가 없습니다.");
      return;
    }

    if (!canPost) {
      alert("공지 작성 권한이 없습니다. 크루 멤버인지 확인하세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await createNotice(crewId, title.trim(), content.trim(), {
        isRequired,
        allowComment,
      });
      if (res?.resultType !== "SUCCESS") {
        throw new Error(res?.message || "공지사항 등록에 실패했습니다.");
      }

      await queryClient.invalidateQueries({ queryKey: ["notices"] });
      await queryClient.invalidateQueries({ queryKey: ["notices", crewId] });
      await queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.some(
            (key) => typeof key === "string" && key.includes("notice")
          ),
      });

      alert("공지사항이 성공적으로 등록되었습니다!");
      navigate(`/crew/${crewId}/notice`);
    } catch (err) {
      console.error("등록 실패:", err);
      alert("등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  function setImages(_files: File[]): void {}

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
              <NoticeAbout contentHtml={content} />
              <FeeSection {...{ fee, setFee }} />
              <ImageAttachment onValueChange={setImages} />
              <SubmitButton onClick={handleSubmit} disabled={isSubmitting || !canPost} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostNoticeForm;  