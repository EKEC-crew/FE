import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import nextBtn from "../../../assets/signIn/btn_login_520x68.svg";
import addProfileImage from "../../../assets/icons/createProfile/addProfileImage.svg";
import disabledBtn from "../../../assets/buttons/disabled.svg";

import BirthDropDown from "./birthDropDown";
import Input from "../input";
import GenderSelect from "./genderSelect";
import {
  createProfileSchema,
  type CreateProfileFormValues,
} from "../../../schemas/auth/createProfileSchema";

const CreateProfileForm = () => {
  const { control, watch, setValue } = useForm<CreateProfileFormValues>({
    resolver: zodResolver(createProfileSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      nickname: "",
      gender: undefined as any,
      birthDate: "",
    },
  });

  const watchedValues = watch();
  const isDefine = watchedValues.gender === "not-defined";
  const schemaValid = createProfileSchema.safeParse(watchedValues).success;

  return (
    <div
      className="flex flex-col items-center justify-center w-full px-[12.86%]"
      style={{ minHeight: "calc(100vh - 9vh)", paddingTop: "9vh" }}
    >
      <div className="text-center text-neutral-800 text-4xl font-bold mb-2">
        이크에크에 온 것을 환영해요!
      </div>
      <div className="text-center text-neutral-800 text-base font-normal mb-8">
        이크에크 활동을 위한 기본 프로필 설정을 도와주세요
      </div>

      <img src={addProfileImage} alt="프로필 이미지 추가" />

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
              value={field.value}
              onChange={field.onChange}
              width="19.79vw"
            />
          )}
        />
        <button
          className="h-12 md:h-14 lg:h-16 bg-gray-200 rounded-[10px] border-2 border-stone-300 text-zinc-800 text-sm md:text-base lg:text-lg font-medium hover:bg-gray-300 transition-colors"
          style={{ width: "6.25vw" }}
        >
          건너뛰기
        </button>
      </div>

      <GenderSelect
        selectedGender={watchedValues.gender || ""}
        onGenderChange={(gender) => setValue("gender", gender as any)}
        isNotDefine={isDefine}
        onNotDefineChange={(value) =>
          setValue("gender", value ? "not-defined" : ("" as any))
        }
      />

      <div className="mb-2" style={{ width: "27.08vw" }}>
        <span className="text-zinc-800 text-xl font-semibold">생년월일</span>
        <span className="text-red-500 text-xl font-semibold">*</span>
      </div>

      <BirthDropDown
        birthDate={watchedValues.birthDate}
        setBirthDate={(date) => setValue("birthDate", date)}
      />
      <Link
        to="/createProfile/phoneNumber"
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
      </Link>
    </div>
  );
};

export default CreateProfileForm;
