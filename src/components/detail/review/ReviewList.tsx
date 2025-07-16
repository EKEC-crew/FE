import React from "react";
import ReviewItem from "./ReviewItem";

const ReviewList: React.FC = () => {
  const reviews = new Array(5).fill(null).map((_, idx) => ({
    id: idx,
    name: "000님",
    content: "술 못 마시는 사람은 힘들 듯 합니다 참고하세요. 다들 친절하세요!!",
    stars: 5,
  }));

  return (
    <div className="space-y-4 pt-4">
      {reviews.map((r) => (
        <ReviewItem key={r.id} {...r} />
      ))}
    </div>
  );
};

export default ReviewList;
