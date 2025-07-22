import { Controller } from "react-hook-form";
import nextBtn from "../../../assets/signIn/btn_login_520x68.svg";
import addProfileImage from "../../../assets/icons/createProfile/addProfileImage.svg";
import disabledBtn from "../../../assets/buttons/disabled.svg";

import BirthDropDown from "./birthDropDown";
import Input from "../input";
import GenderSelect from "./genderSelect";
import { createProfileSchema } from "../../../schemas/auth/createProfileSchema";

interface BasicInfoFormProps {
  control: any;
  watchedValues: any;
  setValue: any;
  onNext: () => void;
}

const BasicInfoForm = ({
  control,
  watchedValues,
  setValue,
  onNext,
}: BasicInfoFormProps) => {
  const isDefine = watchedValues.gender === "not-defined";
  const schemaValid = createProfileSchema.safeParse(watchedValues).success;
  const isNicknameSkipped = watchedValues.nickname === null;

  const handleSkipNickname = () => {
    setValue("nickname", isNicknameSkipped ? "" : null);
  };

  const handleNicknameChange = (value: string) => {
    setValue("nickname", value);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <img src={addProfileImage} alt="프로필 이미지 추가" />

      {/* 이름 */}
      <div className="mb-2" style={{ width: "27.08vw" }}>
        <span className="text-zinc-800 text-xl font-semibold">이름</span>
        <span className="text-red-500 text-xl font-semibold">*</span>
      </div>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            placeholder="이름을 입력하세요"
            value={field.value}
            onChange={field.onChange}
            width="27.08vw"
          />
        )}
      />

      {/* 닉네임 */}
      <div className="mb-2" style={{ width: "27.08vw" }}>
        <span className="text-zinc-800 text-xl font-semibold">닉네임</span>
        <span className="text-red-500 text-lg font-normal ml-[0.47vw]">
          설정 이후 수정이 가능해요*
        </span>
      </div>
      <div className="flex items-start gap-[1.04vw]">
        <Controller
          name="nickname"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="닉네임을 입력하세요"
              value={isNicknameSkipped ? "" : field.value || ""}
              onChange={(e) => {
                if (!isNicknameSkipped) {
                  const value = e.target.value;
                  field.onChange(value);
                  handleNicknameChange(value);
                }
              }}
              width="19.79vw"
            />
          )}
        />
        <button
          onClick={handleSkipNickname}
          className="h-12 md:h-14 lg:h-16 rounded-[10px] text-white text-sm md:text-base lg:text-lg font-medium cursor-pointer"
          style={{
            width: "6.25vw",
            backgroundColor: isNicknameSkipped ? "#C5C6CB" : "#37383E",
          }}
        >
          건너뛰기
        </button>
      </div>

      {/* 성별 */}
      <GenderSelect
        selectedGender={watchedValues.gender || ""}
        onGenderChange={(gender) => setValue("gender", gender as any)}
        isNotDefine={isDefine}
        onNotDefineChange={(value) =>
          setValue("gender", value ? "not-defined" : "")
        }
      />

      {/* 생년월일 */}
      <div className="mb-2" style={{ width: "27.08vw" }}>
        <span className="text-zinc-800 text-xl font-semibold">생년월일</span>
        <span className="text-red-500 text-xl font-semibold">*</span>
      </div>
      <BirthDropDown
        birthDate={watchedValues.birthDate}
        setBirthDate={(date) => setValue("birthDate", date)}
      />

      {/* 다음 버튼 */}
      <button
        onClick={onNext}
        disabled={!schemaValid}
        className="w-full max-w-[32.5rem] relative flex items-center justify-center h-12 md:h-14 lg:h-[4.25rem] transition-all duration-200 hover:opacity-90 active:transform active:translate-y-0.5 mb-6"
      >
        <img
          src={schemaValid ? nextBtn : disabledBtn}
          alt="다음으로 버튼"
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-sm md:text-base lg:text-lg font-medium font-['Pretendard']">
          다음
        </div>
      </button>
    </div>
  );
};

export default BasicInfoForm;
