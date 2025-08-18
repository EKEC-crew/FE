import TypeSelector from "./TypeSelector";
import PermissionSelector from "./PermissionSelector";
import TitleInput from "./TitleInput";
import ContentInput from "./ContentInput";
import FeeSection from "./FeeSection";
import SubmitButton from "./SubmitButton";
import Header from "../../header";
import Notice from "../../notice";
import Tabs from "../../tabs";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { createNotice, fetchMyRole } from "../constants";

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
  const [userRole, setUserRole] = useState<number | null>(null);
  const [isCheckingRole, setIsCheckingRole] = useState(true);
  const queryClient = useQueryClient();

  // 권한 체크 - 개선된 로직
  useEffect(() => {
    const checkUserRole = async () => {
      if (!crewId) return;
      
      try {
        setIsCheckingRole(true);
        const roleData = await fetchMyRole(crewId);
        console.log("🔍 사용자 역할 조회 결과:", roleData);
        
        // 역할 번호 추출 (크루장: 2, 운영진: 1, 크루원: 0)
        const role = roleData?.role;
        if (typeof role === 'number') {
          setUserRole(role);
        } else if (typeof role === 'string') {
          // 문자열로 오는 경우 변환
          if (role === 'LEADER' || role === 'CREW_LEADER') setUserRole(2);
          else if (role === 'ADMIN' || role === 'MANAGER') setUserRole(1);
          else if (role === 'MEMBER' || role === 'CREW_MEMBER') setUserRole(0);
          else setUserRole(0); // 기본값
        } else {
          setUserRole(0); // 기본값
        }
      } catch (error) {
        console.error("역할 조회 실패:", error);
        setUserRole(0); // 오류시 기본값
      } finally {
        setIsCheckingRole(false);
      }
    };

    checkUserRole();
  }, [crewId]);

  const hasWritePermission = userRole !== null && userRole >= 1;

  const handleSubmit = async () => {
    if (!hasWritePermission) {
      alert("공지사항 작성 권한이 없습니다. 크루장 또는 운영진만 작성할 수 있습니다.");
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    if (!crewId) {
      alert("크루 ID가 없습니다.");
      return;
    }

    const cid = crewId;
    setIsSubmitting(true);
    try {
      const res = await createNotice(cid, title.trim(), content.trim(), {
        isRequired,
      });

      // API 응답 구조 변경: success -> data
      if (res?.resultType !== "SUCCESS") {
        throw new Error(res?.error?.reason || res?.message || "공지사항 등록에 실패했습니다.");
      }

      // 쿼리 무효화로 목록 새로고침
      await queryClient.invalidateQueries({ queryKey: ["notices"] });
      await queryClient.invalidateQueries({ queryKey: ["notices", cid] });
      await queryClient.invalidateQueries({
        predicate: (q) => q.queryKey.some((k) => typeof k === "string" && k.includes("notice")),
      });

      alert("공지사항이 성공적으로 등록되었습니다!");
      navigate(`/crew/${cid}/notice`, { 
        state: { refresh: true } // 새로고침 플래그 추가
      });
    } catch (err: any) {
      let msg = "등록 중 오류가 발생했습니다.";
      
      // 더 정확한 오류 메시지 추출
      if (err?.response?.data?.error?.reason) {
        msg = err.response.data.error.reason;
      } else if (err?.message) {
        msg = err.message;
      }
      
      // 권한 관련 오류인 경우 특별 처리
      if (msg.includes("권한") || msg.includes("FORBIDDEN") || msg.includes("403")) {
        msg = "공지 작성 권한이 없습니다. 크루장 또는 운영진만 공지를 작성할 수 있습니다.";
      }
      
      alert(msg);
      console.error("등록 실패:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 권한 체크 중이면 로딩 표시
  if (isCheckingRole) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="mt-12 shadow-none">
          <Header />
          <Tabs />
        </div>
        <div className="flex justify-center items-center py-20">
          <div className="text-lg">권한을 확인하는 중...</div>
        </div>
      </div>
    );
  }

  // 권한이 없는 경우
  if (!hasWritePermission) {
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
              <div className="text-center py-20">
                <div className="text-xl font-semibold text-gray-600 mb-4">
                  공지사항 작성 권한이 없습니다
                </div>
                <div className="text-gray-500 mb-6">
                  크루장 또는 운영진만 공지사항을 작성할 수 있습니다.
                  <br />
                  현재 권한: {userRole === 0 ? '크루원' : userRole === 1 ? '운영진' : userRole === 2 ? '크루장' : '알 수 없음'}
                </div>
                <button
                  onClick={() => navigate(`/crew/${crewId}/notice`)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  공지사항 목록으로 돌아가기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
              <SubmitButton
                onClick={handleSubmit}
                disabled={isSubmitting || !crewId || !title.trim() || !content.trim() || !hasWritePermission}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostNoticeForm;