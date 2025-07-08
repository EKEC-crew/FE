import Album from "../../components/detail/album";
const AboutSection: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-14 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-800 text-2xl">모임 소개</span>
        </div>
        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {`
사이클링히트

잠실 2030 여성 야구 직관 동호회,
"사이클링히트"에 오신 걸 환영합니다!
야구에 대해 잘 몰라도 괜찮아요.
함께 즐기고 싶은 마음만 있다면 누구나 환영합니다!

✅ 크루 규칙
- 존중과 배려 : 서로의 팀, 선수, 응원 스타일을 존중합니다.
- 참여와 소통 : 정기 직관 모임,
  단체 채팅방 활동에 적극적으로 참여해 주세요.
- 티켓 예매 : 모임 티켓은 사전에 공지하며,
  신청 후에는 취소가 어렵습니다.
  * 신중히 신청해 주세요.
- 금지사항 : 과도한 음주, 타인 비방, 정치·종교적 발언은 금지입니다.
  (위반 시 탈퇴 조치될 수 있습니다.)

📌 정기모임 안내
- 모임 주기 : 매월 1~2회, 주말이나 평일 저녁에 잠실구장에서 직관합니다.
- 모집 및 일정 안내 : 매월 초, 그달의 직관 일정과 모집 공지를 드립니다.
- 참가 방법 : 공지된 일정에 '신청' 후, 선착순으로 티켓 예매를 진행합니다.
- 참가비 : 티켓 가격 + 소정의 운영비를 합산하여 사전 납부합니다.
- 우천 취소 안내 : 경기 취소 시, 티켓 환불 기준에 따라 처리합니다.

사이클링히트와 함께, 올 시즌 최고의 순간을 만들어봐요!
Let's go, 사이클링히트! 💙💙`}
          <div>
            <div>
              <Album />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
