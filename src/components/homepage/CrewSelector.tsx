interface Props {
  selected: "popular" | "new";
  onChange: (tab: "popular" | "new") => void;
}

export default function CrewSelector({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2">
      <button
        className={`px-6 py-2 rounded-full text-sm w-[329px] h-[55px] font-bold transition-all duration-200 cursor-pointer
        ${selected === "popular" ? "bg-[#3A3CDB] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
        onClick={() => onChange("popular")}
      >
        인기크루
      </button>
      <button
        className={`px-6 py-2 rounded-full text-sm w-[329px] h-[55px] font-bold transition-all duration-200 cursor-pointer
        ${selected === "new" ? "bg-[#3A3CDB] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
        onClick={() => onChange("new")}
      >
        신규크루
      </button>
    </div>
  );
}
