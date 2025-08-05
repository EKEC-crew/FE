import React, { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useBulletinList } from "../../../hooks/useBulletin/useBulletins";
import BulletinPostButton from "./button/post";
import Pagination from "./button/pagination";
import BulletinItem from "./BulletinItem";
import Header from "../header";
import Tabs from "../tabs";
import Notice from "../notice";
import type { Bulletin } from "../../../types/bulletin/types";

const BulletinList: React.FC = () => {
  const navigate = useNavigate();
  const { crewId } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: bulletinData,
    isLoading: loading,
    error,
  } = useBulletinList(
    crewId ? parseInt(crewId, 10) : 0,
    currentPage,
    itemsPerPage
  );

  const bulletins = bulletinData?.bulletins || [];
  const pagination = bulletinData?.pagination;

  const handleBulletinClick = useCallback(
    (bulletin: Bulletin) => {
      console.log("게시글 클릭:", bulletin);
      navigate(`/crew/${crewId}/bulletin/${bulletin.id}`);
    },
    [navigate, crewId]
  );

  const handleWriteClick = useCallback(() => {
    console.log("글쓰기 버튼 클릭");
    navigate(`/crew/${crewId}/post`);
  }, [navigate, crewId]);

  const handlePageChange = useCallback((page: number) => {
    console.log("페이지 변경:", page);
    setCurrentPage(page);
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-6 space-y-6 pt-12 mt-2">
        <div>
          <Header />
          <Tabs />
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto px-1">
        <Notice />
      </div>

      <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm mt-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">게시판</h1>
            <p className="text-gray-600 text-sm pt-2">
              전체 {pagination?.totalElements || 0}건
            </p>
          </div>
        </div>

        {bulletins.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">등록된 게시글이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {bulletins.map((bulletin, index) => (
              <BulletinItem
                key={bulletin.id}
                bulletin={bulletin}
                onBulletinClick={handleBulletinClick}
                index={index}
              />
            ))}
          </div>
        )}

        {bulletins.length > 0 && pagination && (
          <div className="flex justify-center items-center space-x-2 my-8">
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        <div className="flex justify-center mt-6">
          <BulletinPostButton onClick={handleWriteClick} />
        </div>
      </div>
    </div>
  );
};

export default BulletinList;
