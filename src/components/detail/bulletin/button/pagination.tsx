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

    // 끝 페이지가 총 페이지보다 작으면 시작 페이지 조정
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        className="w-6 h-6 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {getPageNumbers().map((n) => (
        <button
          key={n}
          onClick={() => onPageChange(n)}
          className={`w-6 h-6 rounded-full ${
            n === currentPage
              ? "bg-[#3A3ADB] text-white"
              : "border border-gray-300 text-gray-500 font-semibold"
          }`}
        >
          {n}
        </button>
      ))}

      <button
        className="w-6 h-6 rounded-full border border-gray-300 text-gray-500 flex items-center justify-center"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
