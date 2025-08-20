import leftIcon from "../../../../assets/icons/ic_Left_28.svg";
import leftIconDisabled from "../../../../assets/icons/ic_Left_disabled_28.svg";
import rightIcon from "../../../../assets/icons/ic_Right_28.svg";
import rightIconDisabled from "../../../../assets/icons/ic_Right_disabled_28.svg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      {/* 이전 */}
      <button
        className="w-6 h-6 flex items-center justify-center rounded-full border-[2px] border-[#D9DADD] cursor-pointer disabled:cursor-not-allowed"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={isFirst}
        aria-label="이전 페이지"
      >
        <img src={isFirst ? leftIconDisabled : leftIcon} alt="이전" />
      </button>

      {/* 페이지 번호들 */}
      {getPageNumbers().map((n) => (
        <button
          key={n}
          onClick={() => onPageChange(n)}
          className={`w-6 h-6 flex items-center justify-center rounded-full border-[2px] text-sm font-medium cursor-pointer ${
            n === currentPage
              ? "border-[#3A3ADB] bg-[#3A3ADB] text-white"
              : "border-[#93959D] text-[#93959D]"
          }`}
          aria-current={n === currentPage ? "page" : undefined}
        >
          {n}
        </button>
      ))}

      {/* 다음 */}
      <button
        className="w-6 h-6 flex items-center justify-center rounded-full border-[2px] border-[#D9DADD] cursor-pointer disabled:cursor-not-allowed"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={isLast}
        aria-label="다음 페이지"
      >
        <img src={isLast ? rightIconDisabled : rightIcon} alt="다음" />
      </button>
    </div>
  );
};

export default Pagination;
