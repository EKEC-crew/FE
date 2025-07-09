import leftIcon from "../../assets/icons/ic_Left_28.svg";
import leftIconDisabled from "../../assets/icons/ic_Left_disabled_28.svg";
import rightIcon from "../../assets/icons/ic_Right_28.svg";
import rightIconDisabled from "../../assets/icons/ic_Right_disabled_28.svg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-4">
      {/* 왼쪽 화살표 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-11 h-11 flex items-center justify-center rounded-full border-[2px] border-[#D9DADD] disabled:cursor-not-allowed"
      >
        <img src={currentPage === 1 ? leftIconDisabled : leftIcon} alt="이전" />
      </button>

      {/* 페이지 번호들 */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`
            w-11 h-11 flex items-center justify-center rounded-full border-[2px] text-2xl font-medium
            ${
              page === currentPage
                ? "border-[#3A3ADB] bg-[#3A3ADB] text-white"
                : "border-[#93959D] text-[#93959D]"
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* 오른쪽 화살표 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-11 h-11 flex items-center justify-center rounded-full border-[2px] border-[#D9DADD] disabled:cursor-not-allowed"
      >
        <img
          src={currentPage === totalPages ? rightIconDisabled : rightIcon}
          alt="다음"
        />
      </button>
    </div>
  );
};

export default Pagination;
