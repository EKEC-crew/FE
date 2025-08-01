const Pagination = () => (
  <div className="flex justify-center gap-2 mt-4">
    <button className="w-6 h-6 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center">
      &lt;
    </button>

    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        className={`w-6 h-6 rounded-full ${
          n === 1
            ? "bg-[#3A3ADB] text-white"
            : "border border-gray-300 text-gray-500 font-semibold"
        }`}
      >
        {n}
      </button>
    ))}

    <button className="w-6 h-6 rounded-full border border-gray-300 text-gray-500 flex items-center justify-center">
      &gt;
    </button>
  </div>
);

export default Pagination;
