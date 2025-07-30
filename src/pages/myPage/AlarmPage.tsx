import { useState } from "react";
import ToggleSwitch from "../../components/myPage/alarm/ToggleSwitch";

export default function AlarmPage() {
  const [sms, setSms] = useState(true);
  const [kakao, setKakao] = useState(true);
  const [email, setEmail] = useState(false);

  return (
    <div className="px-10 py-6">
      <div className="text-[2.25rem] font-semibold mb-8">알림 설정</div>

      <div className="divide-y divide-gray-300">
        <div className="flex justify-between items-center py-4">
          <span className="text-[1.625rem] font-semibold">SMS 알림</span>
          <ToggleSwitch enabled={sms} onChange={setSms} />
        </div>
        <div className="flex justify-between items-center py-4">
          <span className="text-[1.625rem] font-semibold">카카오 알림</span>
          <ToggleSwitch enabled={kakao} onChange={setKakao} />
        </div>
        <div className="flex justify-between items-center py-4">
          <span className="text-[1.625rem] font-semibold">이메일 알림</span>
          <ToggleSwitch enabled={email} onChange={setEmail} />
        </div>
      </div>
    </div>
  );
}
