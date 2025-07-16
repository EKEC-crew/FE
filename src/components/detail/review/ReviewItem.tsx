import React from "react";

interface ReviewItemProps {
  name: string;
  content: string;
  stars: number;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ name, content, stars }) => {
  return (
    <div className="flex gap-4 items-start bg-[#F9FAFB] p-4 rounded-lg shadow-sm">
      <div className="bg-gray-200 rounded-full w-8 h-8 shrink-0" />
      <div className="flex-1">
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-sm text-gray-600">{content}</p>
      </div>
      <div className="text-yellow-400 text-sm shrink-0">{'★'.repeat(stars)}</div>
    </div>
  );
};

export default ReviewItem;
