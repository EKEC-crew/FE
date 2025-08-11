import { useState } from "react";
import { useParams } from "react-router-dom";
import TypeSelector from "./TypeSelector";
import DateSelector from "./DateSelector";
import PermissionSelector from "./PermissionSelector";
import TitleInput from "./TitleInput";
import ContentInput from "./ContentInput";
import FeeSection from "./FeeSection";
import SubmitButton from "./SubmitButton";
import Header from "../../header";
import Notice from "../../notice";
import Tabs from "../../tabs";
import { useCreateSchedule } from "../../../../hooks/schedule/useCreateSchedule";
import type { ScheduleType } from "../../../../types/detail/schedule/types";

const PostScheduleForm = () => {
  const { crewId } = useParams<{ crewId: string }>();
  const createScheduleMutation = useCreateSchedule();

  // 폼 상태 관리
  const [type, setType] = useState("regular");
  const [isRequired, setIsRequired] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [allowComments, setAllowComments] = useState(true);
  const [allowPrivateComments, setAllowPrivateComments] = useState(true);
  const [allowExternalShare, setAllowExternalShare] = useState(false);
  const [hasFee, setHasFee] = useState(false);
  const [fee, setFee] = useState(0);
  const [feePurpose, setFeePurpose] = useState("");

  // 폼 제출 처리
  const handleSubmit = () => {
    if (!crewId) {
      alert("크루 ID가 없습니다.");
      return;
    }

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    // HTML 태그를 제거하고 실제 텍스트 내용만 추출하여 검증
    const textContent = content.replace(/<[^>]*>/g, "").trim();
    if (!textContent) {
      alert("본문을 입력해주세요.");
      return;
    }

    if (!selectedDate) {
      alert("날짜를 선택해주세요.");
      return;
    }

    // 회비가 체크되어 있을 때만 회비 관련 검증
    if (hasFee) {
      if (fee <= 0) {
        alert("회비 금액을 입력해주세요.");
        return;
      }
      if (!feePurpose.trim()) {
        alert("회비 사용 목적을 입력해주세요.");
        return;
      }
    }

    // 기본 시간을 12:00으로 설정
    const dateTime = new Date(selectedDate);
    dateTime.setHours(12, 0, 0, 0);

    // API 요청 데이터 구성
    const requestData = {
      title: title.trim(),
      content: content.trim(),
      day: dateTime.toISOString(),
      type: (type === "regular" ? 0 : 1) as ScheduleType,
      isRequired,
      allowComments,
      allowPrivateComments,
      allowExternalShare,
      hasFee,
      fee: hasFee ? fee : 0,
      feePurpose: hasFee ? feePurpose.trim() : "",
    };

    console.log("전송할 데이터:", requestData);

    createScheduleMutation.mutate({
      crewId,
      scheduleData: requestData,
    });
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
              크루 일정 등록하기
            </div>

            <div className="space-y-6 px-2 lg:px-6">
              <TypeSelector
                type={type}
                setType={setType}
                isRequired={isRequired}
                setIsRequired={setIsRequired}
              />
              <DateSelector onDateChange={setSelectedDate} />
              <PermissionSelector
                allowComments={allowComments}
                allowPrivateComments={allowPrivateComments}
                allowExternalShare={allowExternalShare}
                onAllowCommentsChange={setAllowComments}
                onAllowPrivateCommentsChange={setAllowPrivateComments}
                onAllowExternalShareChange={setAllowExternalShare}
              />
              <TitleInput title={title} setTitle={setTitle} />
              <ContentInput content={content} setContent={setContent} />
              <FeeSection
                hasFee={hasFee}
                setHasFee={setHasFee}
                fee={fee}
                setFee={setFee}
                feePurpose={feePurpose}
                setFeePurpose={setFeePurpose}
              />
              <SubmitButton
                onSubmit={handleSubmit}
                isLoading={createScheduleMutation.isPending}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostScheduleForm;
