import { useCrewInfo } from "../../hooks/apply/useCrewInfo";
import logo from "../../assets/logo/ic_logo graphic_45.svg";
interface props {
  crewId: number;
}
const Info = ({ crewId }: props) => {
  const { crewInfo, loading, error } = useCrewInfo(crewId);
  // 로딩/에러 상태 처리
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!crewInfo) return <div>크루 정보를 찾을 수 없습니다.</div>;

  // 베너 이미지 추출
  const bannerImage = crewInfo.bannerImage
    ? `${import.meta.env.VITE_API_BASE_URL}/image/?type=0&fileName=${crewInfo.bannerImage}`
    : "";

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      {crewInfo.bannerImage ? (
        <img
          src={bannerImage}
          className="w-[80px] h-[80px] rounded-full object-cover"
          alt="크루 베너"
        />
      ) : (
        <img src={logo} className="h-[4.625rem] w-[4.625rem]" alt="기본 로고" />
      )}
      <div className="text-[2.5rem] font-bold">{crewInfo.title} 크루 지원</div>
      <div className="h-[15.625rem] w-full bg-[#F7F7FB] rounded-[0.625rem] text-[1.375rem] font-semibold text-justify p-12 overflow-y-auto">
        {crewInfo.introduction
          ? crewInfo.introduction
          : "신청해주셔서 감사합니다"}
      </div>
    </div>
  );
};

export default Info;
