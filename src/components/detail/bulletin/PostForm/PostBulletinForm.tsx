import TypeSelector from "./TypeSelector";
import PermissionSelector from "./PermissionSelector";
import TitleInput from "./TitleInput";
import ContentInput from "./ContentInput";
import FeeSection from "./FeeSection";
import SubmitButton from "./SubmitButton";
import ImageAttachment from "./ImageAttachment";
import Header from "../../header";
import Notice from "../../notice";
import Tabs from "../../tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../constants";
import type { RequestCreatePostDto } from "../types";

const PostBulletinForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [type, setType] = useState("regular");
  const [isRequired, setIsRequired] = useState(true);
  const [fee, setFee] = useState("");
  const [isFeeRequired, setIsFeeRequired] = useState(true);
  const [feePurpose, setFeePurpose] = useState("");
  const [allowComment, setAllowComment] = useState(true);
  const [allowPrivateComment, setAllowPrivateComment] = useState(true);
  const [allowShare, setAllowShare] = useState(true);

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const currentCrewId = "1"; // crewId를 1로 고정
      console.log("PostBulletinForm - 사용할 crewId:", currentCrewId);

      const userId = 1; // userId도 1로 고정

      const postData: RequestCreatePostDto = {
        title: title,
        content: content,
        userId: userId,
        images: images,
        type,
        isRequired,
        fee,
        isFeeRequired,
        feePurpose,
        allowComment,
        allowPrivateComment,
        allowShare,
      };

      console.log("PostBulletinForm - 전송할 데이터:", postData);

      const response = await createPost(currentCrewId, postData);

      console.log("PostBulletinForm - API 응답:", response);

      if (response.resultType === "SUCCESS") {
        alert("게시글이 성공적으로 등록되었습니다.");
        // 게시글 목록으로 돌아가기
        navigate("/detail/bulletin");
      } else {
        alert(
          `게시글 등록에 실패했습니다: ${response.error?.reason || "알 수 없는 오류"}`
        );
      }
    } catch (error) {
      console.error("PostBulletinForm - 게시글 등록 오류:", error);
      alert(
        "게시글 등록 중 오류가 발생했습니다. 하지만 테스트용으로 성공 처리합니다."
      );

      // 테스트용: 에러가 발생해도 성공으로 처리
      navigate("/detail/bulletin");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              게시글 등록하기
            </div>

            <div className="space-y-6 px-2 lg:px-6">
              <TypeSelector
                type={type}
                setType={setType}
                isRequired={isRequired}
                setIsRequired={setIsRequired}
              />
              <PermissionSelector
                allowComment={allowComment}
                setAllowComment={setAllowComment}
                allowPrivateComment={allowPrivateComment}
                setAllowPrivateComment={setAllowPrivateComment}
                allowShare={allowShare}
                setAllowShare={setAllowShare}
              />
              <TitleInput onValueChange={setTitle} />
              <ContentInput onValueChange={setContent} />
              <FeeSection
                fee={fee}
                setFee={setFee}
                isFeeRequired={isFeeRequired}
                setIsFeeRequired={setIsFeeRequired}
                feePurpose={feePurpose}
                setFeePurpose={setFeePurpose}
              />
              <ImageAttachment onValueChange={setImages} />
              <SubmitButton onClick={handleSubmit} disabled={isSubmitting} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBulletinForm;
