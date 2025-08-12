import checkBoxIcon from "/src/assets/icons/ic_check_de.svg";
import pressedCheckBoxIcon from "/src/assets/icons/ic_check_pressed.svg";

interface FeeSectionProps {
  hasFee: boolean;
  setHasFee: (hasFee: boolean) => void;
  fee: number;
  setFee: (fee: number) => void;
  feePurpose: string;
  setFeePurpose: (purpose: string) => void;
}

const FeeSection = ({
  hasFee,
  setHasFee,
  fee,
  setFee,
  feePurpose,
  setFeePurpose,
}: FeeSectionProps) => {
  const handleRegistrationToggle = () => {
    setHasFee(!hasFee);
  };

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setFee(value ? parseInt(value) : 0);
  };

  const handlePurposeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeePurpose(e.target.value);
  };

  return (
    <div className="mb-4">
      <label className="block font-bold mb-1 p-1">회비 등록</label>

      {/* 체크박스 */}
      <div className="flex items-center gap-2 mb-2 p-1 text-sm">
        <div onClick={handleRegistrationToggle} className="cursor-pointer">
          <img
            src={hasFee ? pressedCheckBoxIcon : checkBoxIcon}
            alt="checkbox"
            className="w-5 h-5"
          />
        </div>
        회비 등록 여부
      </div>

      {hasFee && (
        <>
          <div className="relative mb-2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black font-bold py-3 pt-3">
              ₩
            </span>
            <input
              type="text"
              value={fee > 0 ? fee.toLocaleString() : ""}
              onChange={handleFeeChange}
              className="w-full border p-2 pl-8 rounded text-sm placeholder-gray-400"
              placeholder="금액을 입력해주세요"
            />
          </div>

          {/* 회비 사용 목적 입력 */}
          <input
            type="text"
            value={feePurpose}
            onChange={handlePurposeChange}
            className="w-full border p-2 rounded text-sm placeholder-gray-400"
            placeholder="회비 사용 목적을 입력해주세요"
          />
        </>
      )}
    </div>
  );
};

export default FeeSection;
