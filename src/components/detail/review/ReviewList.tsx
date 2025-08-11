import React from "react";
import ReviewItem from "./ReviewItem";

interface ReviewListProps {
  currentPage?: number;
  onPaginationChange?: (pagination: any) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({
  currentPage = 1,
  onPaginationChange,
}) => {
  const reviews = new Array(5).fill(null).map((_, idx) => ({
    id: idx,
    name: "000님",
    content: "술 못 마시는 사람은 힘들 듯 합니다 참고하세요. 다들 친절하세요!!",
    stars: 5,
  }));

  // 더미 pagination 정보 - 실제 API 연동 시 교체 필요
  const dummyPagination = {
    totalPages: 1,
    currentPage: currentPage,
    totalElements: 5,
    hasNext: false,
    hasPrevious: false,
  };

  // pagination 정보를 부모에게 전달
  if (onPaginationChange) {
    onPaginationChange(dummyPagination);
  }

  return (
    <div className="space-y-4 pt-4">
      {reviews.map((r) => (
        <ReviewItem key={r.id} {...r} />
      ))}
    </div>
  );
};

export default ReviewList;
