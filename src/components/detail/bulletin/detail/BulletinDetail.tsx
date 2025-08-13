import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBulletinDetail } from "../../../../hooks/bulletin/useBulletins";
import { useDeleteBulletin } from "../../../../hooks/bulletin/useBulletinActions";
import { useAuthStore } from "../../../../store/useAuthStore";
import Header from "../../header";
import Tabs from "../../tabs";
import BulletinAbout from "./BulletinAbout";
import BulletinAction from "./BulletinAction";
import BulletinComments from "./BulletinComments";

const BulletinDetail = () => {
  const { crewId, id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const deleteBulletinMutation = useDeleteBulletin(crewId || "");

  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comments] = useState([
    { id: 2, text: "확인 완료! 열심히 활동하겠습니다.", date: "2025.06.18" },
    { id: 3, text: "확인 완료! 열심히 활동하겠습니다.", date: "2025.06.18" },
  ]);

  const {
    data: bulletin,
    isLoading: loading,
    error,
  } = useBulletinDetail(
    crewId ? parseInt(crewId, 10) : 0,
    id ? parseInt(id, 10) : 0
  );

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            {error instanceof Error
              ? error.message
              : "게시글을 불러오는 중 오류가 발생했습니다."}
          </p>
          <button
            onClick={() => navigate(`/crew/${crewId}/bulletin`)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  if (!bulletin) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">게시글을 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate(`/crew/${crewId}/bulletin`)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 작성자 여부 확인
  const isAuthor = user?.id === bulletin.userId;

  // 수정 버튼 핸들러
  const handleEdit = () => {
    navigate(`/crew/${crewId}/bulletin/${id}/edit`);
  };

  // 삭제 버튼 핸들러
  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteBulletinMutation.mutate(id || "");
    }
  };

  // 목록으로 이동
  const handleGoToList = () => {
    navigate(`/crew/${crewId}/bulletin`);
  };

  // 좋아요 토글 (추후 구현)
  const handleLikeToggle = () => {
    // TODO: 좋아요 API 연결
    console.log("좋아요 토글");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-6 space-y-6 pt-12">
        {/* 상단 Header + Tabs */}
        <div>
          <Header />
          <Tabs />
        </div>

        {/* 본문 콘텐츠 */}
        <div className="px-6 py-6 space-y-3 pt-0">
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            {/* 제목 + 태그 */}
            <div className="flex items-center space-x-2">
              {bulletin.isPopular && (
                <span className="bg-[#3A3ADB] text-white text-xs px-2 py-0.5 rounded-full">
                  인기
                </span>
              )}
              <h2 className="text-xl font-bold">{bulletin.title}</h2>
              {bulletin.hasAttachment && (
                <span className="text-blue-500 text-sm">📎</span>
              )}
            </div>

            {/* 작성자 정보 + 버튼 */}
            <div className="flex justify-between items-center">
              <div className="flex py-1 items-center gap-4">
                <p className="text-sm text-gray-500">{bulletin.author}</p>
                <p className="text-sm text-gray-500">{bulletin.date}</p>
                <div className="flex items-center gap-2">
                  {bulletin.likeCount > 0 && (
                    <span className="text-red-500 text-sm">
                      ♥ {bulletin.likeCount}
                    </span>
                  )}
                  {bulletin.commentCount > 0 && (
                    <span className="text-blue-500 text-sm">
                      💬 {bulletin.commentCount}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 게시글 내용 */}
            <BulletinAbout bulletin={bulletin} />

            {/* 버튼 영역 */}
            <BulletinAction
              isCommentOpen={isCommentOpen}
              toggleComment={() => setIsCommentOpen((prev) => !prev)}
              isAuthor={isAuthor}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onGoToList={handleGoToList}
              likeCount={bulletin.likeCount}
              commentCount={bulletin.commentCount}
              isLiked={bulletin.isLiked}
              onLikeToggle={handleLikeToggle}
            />

            {/* 댓글 영역 */}
            <BulletinComments isOpen={isCommentOpen} comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulletinDetail;
