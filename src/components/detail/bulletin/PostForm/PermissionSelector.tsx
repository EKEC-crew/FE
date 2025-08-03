const PermissionSelector = () => {
  return (
    <div className="mb-4">
      <label className="block font-bold mb-1">허용 범위</label>
      <div className="flex gap-6 p-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="type"
            value="comment"
            defaultChecked
            className="w-5 h-5 appearance-none rounded-sm border-2 border-[#3A3ADB]
              checked:bg-[#ffffff] checked:border-[#3A3ADB] 
              checked:bg-check bg-center bg-no-repeat"
          />
          <span>댓글 허용</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="type"
            value="private-comment"
            defaultChecked
            className="w-5 h-5 appearance-none rounded-sm border-2 border-[#3A3ADB]
              checked:bg-[#ffffff] checked:border-[#3A3ADB] 
              checked:bg-check bg-center bg-no-repeat"
          />
          <span>비공개 댓글 허용</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="type"
            value="share"
            defaultChecked
            className="w-5 h-5 appearance-none rounded-sm border-2 border-[#3A3ADB]
              checked:bg-[#ffffff] checked:border-[#3A3ADB] 
              checked:bg-check bg-center bg-no-repeat"
          />
          <span>외부 공유 허용</span>
        </label>
      </div>
    </div>
  );
};

export default PermissionSelector;
