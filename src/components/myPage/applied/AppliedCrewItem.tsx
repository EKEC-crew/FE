import type { AppliedCrew } from "../../../types/mypage/AppliedCrew";

interface Props {
  crew: AppliedCrew;
}

const AppliedCrewItem = ({ crew }: Props) => {
  return (
    <div className="flex items-center justify-between w-[56rem] h-[10rem] bg-[#F7F7FB] rounded-2xl px-6">
      {/* 좌측: 이미지 + 텍스트 */}
      <div className="flex items-center">
        {/* 이미지 */}
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
          <img
            src={crew.imageUrl}
            alt={crew.name}
            className="w-16 h-16 object-cover"
          />
        </div>

        {/* 텍스트 */}
        <div className="ml-6">
          <h3 className="text-lg font-bold">{crew.name}</h3>
          <p className="text-sm text-gray-600">{crew.description}</p>
        </div>
      </div>

      {/* 상태 버튼 */}
      <span
        className={`w-[10.9rem] h-[3.4rem] rounded-xl text-base font-medium text-center flex items-center justify-center
    ${crew.status === "미승인" ? "bg-gray-300 text-gray-700" : "bg-indigo-600 text-white"}
  `}
      >
        {crew.status}
      </span>
    </div>
  );
};
export default AppliedCrewItem;
