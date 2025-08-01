import { Controller } from "react-hook-form";
import { useCallback, useState } from "react";

import addProfileImage from "../../../assets/icons/createProfile/addProfileImage.svg";

import BirthDropDown from "./birthDropDown";
import Input from "../input";
import GenderSelect from "./genderSelect";
import AuthBtn from "../authBtn";
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

  const [skipNickname, setSkipNickname] = useState(false);

  const handleSkipNickname = useCallback(() => {
    if (skipNickname) {
      setValue("nickname", "");
      setSkipNickname(false);
    } else {
      setValue("nickname", watchedValues.name || "");
      setSkipNickname(true);
    }
  }, [skipNickname, setValue, watchedValues.name]);

  const handleBirthDateChange = useCallback(
    (date: string) => {
      setValue("birthDate", date);
    },
    [setValue]
  );

  return (
    <div className="flex flex-col items-center justify-center w-[520px] h-full px-2">
      {/* 프로필 이미지 */}
      <div className="flex justify-center mb-4">
        <img src={addProfileImage} alt="프로필 이미지 추가" />
      </div>

      {/* 이름 */}
      <div className="mb-2 w-full">
        <span className="text-[#2B2C31] text-xl font-semibold">이름</span>
        <span className="text-[#FF4949] text-xl font-semibold">*</span>
      </div>
      <div className="w-full">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="이름을 입력하세요"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      {/* 닉네임 */}
      <div className="mb-2 w-full">
        <span className="text-[#2B2C31] text-xl font-semibold">닉네임</span>
        <span className="text-[#FF4949] text-lg font-normal ml-2">
          설정 이후 수정이 가능해요*
        </span>
      </div>
      <div className="flex items-start w-full mb-6">
        <div className="flex-1 mr-3">
          <Controller
            name="nickname"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                placeholder="닉네임을 입력하세요"
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
                width="380px"
                disabled={skipNickname}
              />
            )}
          />
        </div>

        {/* 건너뛰기 */}
        <button
          onClick={handleSkipNickname}
          className={`
            w-[120px] h-16 
            rounded-[10px] 
            text-white text-lg font-semibold cursor-pointer
            ${skipNickname ? "bg-[#C5C6CB]" : "bg-[#37383E]"}
          `}
        >
          건너뛰기
        </button>
      </div>

      {/* 성별 */}
      <div className="mb-2 w-full">
        <span className="text-[#2B2C31] text-xl font-semibold">성별</span>
        <span className="text-[#FF4949] text-xl font-semibold">*</span>
      </div>
      <div className="w-full flex justify-center">
        <GenderSelect
          selectedGender={watchedValues.gender || ""}
          onGenderChange={(gender) => setValue("gender", gender as any)}
          isNotDefine={isDefine}
          onNotDefineChange={(value) =>
            setValue("gender", value ? "not-defined" : "")
          }
          buttonWidth="250px"
          buttonHeight="50px"
          checkBoxWidth="100%"
        />
      </div>

      {/* 생년월일 */}
      <div className="mb-3 w-full">
        <span className="text-[#2B2C31] text-xl font-semibold">생년월일</span>
        <span className="text-[#FF4949] text-xl font-semibold">*</span>
      </div>
      <div className="w-full">
        <BirthDropDown
          birthDate={watchedValues.birthDate}
          setBirthDate={handleBirthDateChange}
        />
      </div>

      {/* 다음 버튼 */}
      <div className="w-full">
        <AuthBtn onClick={onNext} disabled={!schemaValid} className="mb-6">
          다음
        </AuthBtn>
      </div>
    </div>
  );
};

export default BasicInfoForm;
