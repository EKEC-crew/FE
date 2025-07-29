import { Controller } from "react-hook-form";
import { useCallback } from "react";

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
  const isNicknameSkipped = watchedValues.nickname === null;

  const handleSkipNickname = () => {
    setValue("nickname", isNicknameSkipped ? "" : null);
  };

  const handleNicknameChange = (value: string) => {
    setValue("nickname", value);
  };

  const handleBirthDateChange = useCallback(
    (date: string) => {
      setValue("birthDate", date);
    },
    [setValue]
  );

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-2">
      {/* 전체 서브 컨테이너  */}
      <div className="w-full max-w-[30%] min-w-[360px]">
        {/* 프로필 이미지 */}
        <div className="flex justify-center mb-4">
          <img src={addProfileImage} alt="프로필 이미지 추가" />
        </div>

        {/* 이름 */}
        <div className="mb-2 w-full">
          <span className="text-zinc-800 text-xl font-semibold">이름</span>
          <span className="text-red-500 text-xl font-semibold">*</span>
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
        <div className="flex items-start gap-3 w-full">
          {/* 닉네임 Input */}
          <div className="flex-1">
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
                />
              )}
            />
          </div>
          {/* 건너뛰기 버튼 - 고정 너비 */}
          <button
            onClick={handleSkipNickname}
            className="h-12 md:h-14 lg:h-16 w-24 rounded-[10px] text-white text-sm md:text-base lg:text-lg font-medium cursor-pointer flex-shrink-0"
            style={{
              backgroundColor: isNicknameSkipped ? "#C5C6CB" : "#37383E",
            }}
          >
            건너뛰기
          </button>
        </div>

        {/* 성별 */}
        <div className="mb-2 w-full">
          <span className="text-zinc-800 text-xl font-semibold">성별</span>
          <span className="text-red-500 text-xl font-semibold">*</span>
        </div>
        <div className="w-full flex justify-center">
          <GenderSelect
            selectedGender={watchedValues.gender || ""}
            onGenderChange={(gender) => setValue("gender", gender as any)}
            isNotDefine={isDefine}
            onNotDefineChange={(value) =>
              setValue("gender", value ? "not-defined" : "")
            }
            buttonWidth="120px"
            buttonHeight="50px"
            checkBoxWidth="100%"
          />
        </div>

        {/* 생년월일 */}
        <div className="mb-2 w-full">
          <span className="text-zinc-800 text-xl font-semibold">생년월일</span>
          <span className="text-red-500 text-xl font-semibold">*</span>
        </div>
        <div className="w-full">
          <BirthDropDown
            birthDate={watchedValues.birthDate}
            setBirthDate={handleBirthDateChange}
          />
        </div>

        {/* 다음 버튼 - AuthBtn 사용 */}
        <div className="w-full mt-6">
          <AuthBtn onClick={onNext} disabled={!schemaValid} className="mb-6">
            다음
          </AuthBtn>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;
