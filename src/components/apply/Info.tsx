import logo from "../../assets/logo/ic_logo graphic_45.svg";

const Info = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <img src={logo} className="h-[4.625rem] w-[4.625rem]" />
      <div className="text-[2.5rem] font-bold">정동열짱짱2 크루 지원</div>
      <div className="h-[15.625rem] w-full bg-[#F7F7FB] rounded-[0.625rem] text-[1.375rem] font-semibold text-justify p-12 overflow-y-auto">
        추후에 .. api 달아야징,,, <br />
        내용이 길어질 경우 이렇게 스크롤 됩니다. <br />
        내용이 길어질 경우 이렇게 스크롤 됩니다. <br />
        내용이 길어질 경우 이렇게 스크롤 됩니다. <br />
        내용이 길어질 경우 이렇게 스크롤 됩니다. <br />
        내용이 길어질 경우 이렇게 스크롤 됩니다. <br />
        내용이 길어질 경우 이렇게 스크롤 됩니다. <br />
      </div>
    </div>
  );
};

export default Info;
