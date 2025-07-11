type Props = {
  isCommentOpen: boolean;
  toggleComment: () => void;
};

const ScheduleAction = ({ isCommentOpen, toggleComment }: Props) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center gap-2">
        <button>
          <img src="/schedule/iconHeart.svg" alt="좋아요" className="w-5 h-5" />
        </button>
        <button>
          <img src="/schedule/iconShare.svg" alt="공유" className="w-5 h-5" />
        </button>
        <button
          className="bg-white border border-gray-300 px-3 py-0.5 rounded-2xl text-sm flex items-center gap-1"
          onClick={toggleComment}
        >
          댓글
          <img
            src="/schedule/iconDown.svg"
            alt="down"
            className={`w-5 h-5 transform transition-transform duration-200 ${
              isCommentOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button className="bg-white border border-gray-300 px-3 py-0.5 rounded-2xl text-sm">
          수정
        </button>
        <button className="bg-white border border-gray-300 px-3 py-0.5 rounded-2xl text-sm">
          삭제
        </button>
        <button className="bg-gary-200 bg-gray-200 px-3 py-0.5 rounded-2xl text-sm">
          목록
        </button>
      </div>
    </div>
  );
};

export default ScheduleAction;
