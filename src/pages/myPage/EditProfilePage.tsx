import { FormProvider, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { editProfileSchema } from "../../schemas/edit/editProfileSchema";
import Input from "../../components/auth/input";
import BirthDropDown from "../../components/auth/createProfile/birthDropDown";
import GenderSelect from "../../components/auth/createProfile/genderSelect";
import PhoneNumEdit from "../../components/myPage/edit/PhoneNumEdit";

import ableBtn from "../../assets/signIn/btn_login_520x68.svg";
import disabledBtn from "../../assets/buttons/disabled.svg";
import { useAuthStore } from "../../store/useAuthStore";

export default function EditProfilePage() {
  // 서버에서 받아온 기본값 (gender, birthDate는 검증 제외하고 표시만)
  const { user } = useAuthStore(); // ✅ 컴포넌트 내부에서 Hook 호출
  const defaultValues = {
    name: user?.name,
    nickname: user?.nickname,
    gender: user?.gender,
    birthDate: user?.birthday,
    phone: user?.phone,
    carrier: "",
    password: "",
    passwordConfirm: "",
  };

  // useForm: gender, birthDate는 스키마에 없으므로 타입 any로 처리
  const methods = useForm<any>({
    resolver: zodResolver(editProfileSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  // gender와 birthDate는 읽기 전용
  const birthDate = watch("birthDate") as string;

  const [gender, setGender] = useState<"male" | "female" | "not-defined">(
    "male"
  );

  // 이전 성별 기억하기 위한 상태
  const [previousGender, setPreviousGender] = useState<"male" | "female">(
    "male"
  );
  const [isNotDefine, setIsNotDefine] = useState(false);
  const watchedValues = watch();

  console.log("watchedValues", watchedValues);
  console.log("validation", editProfileSchema.safeParse(watchedValues));

  const isValid = editProfileSchema.safeParse(watchedValues).success;

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const onSubmit = (data: any) => {
    const finalData = {
      ...data,
      gender: gender, // 현재 useState의 gender 값 추가
    };
    console.log("전체 제출 데이터:", finalData);
    // PATCH 요청
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[38.375rem] mx-auto space-y-6 px-3 py-6"
      >
        {/* 이름 */}
        <div>
          <label className="block font-semibold text-lg mb-1 text-gray-400">
            이름
          </label>
          <Input
            type="text"
            value={watchedValues.name}
            disabled
            placeholder={defaultValues.name}
            width="100%"
          />
        </div>

        {/* 닉네임 */}
        <div>
          <label className="block font-semibold text-lg mb-1">닉네임</label>
          <Controller
            name="nickname"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                placeholder="닉네임을 입력하세요"
                value={field.value ?? ""}
                onChange={field.onChange}
                width="100%"
              />
            )}
          />
          {errors.nickname && typeof errors.nickname.message === "string" && (
            <p className="text-red-500 text-sm">{errors.nickname.message}</p>
          )}
        </div>

        {/* 성별 (읽기 전용) */}
        <div>
          <label className="block font-semibold text-lg mb-1 text-gray-400">
            성별
          </label>
          <GenderSelect
            selectedGender={gender}
            onGenderChange={(newGender) => {
              if (newGender !== "not-defined") {
                setPreviousGender(newGender as "male" | "female");
              }
              setGender(newGender);
            }}
            isNotDefine={isNotDefine}
            onNotDefineChange={(checked) => setIsNotDefine(checked)}
            disabled={true} // 남/여 버튼 비활성화
            notDefineDisabled={false} // 밝히지 않음 버튼 활성화
            originalGender={previousGender}
            buttonWidth="292px"
            buttonHeight="50px"
            checkBoxWidth="100%"
          />
        </div>

        {/* 생년월일 (읽기 전용) */}
        <div>
          <label className="block font-semibold text-lg mb-1 text-gray-400">
            생년월일
          </label>
          <BirthDropDown
            birthDate={birthDate}
            setBirthDate={() => {}}
            disabled
            width="100%"
          />
        </div>

        {/* 전화번호 */}
        <PhoneNumEdit
          onPassClick={(carrier, phone) => {
            console.log("PASS 인증 요청:", carrier, phone);
          }}
        />

        {/* 비밀번호 */}
        <div>
          <label className="block font-semibold text-lg mb-1">비밀번호</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={field.value}
                onChange={field.onChange}
                showPassword={showPassword}
                togglePassword={() => setShowPassword((prev) => !prev)}
                width="100%"
              />
            )}
          />

          {errors.password && typeof errors.password.message === "string" && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <label className="block font-semibold text-lg mb-1">
            비밀번호 확인
          </label>
          <Controller
            name="passwordConfirm"
            control={control}
            render={({ field }) => (
              <Input
                type="password"
                placeholder="비밀번호 확인"
                value={field.value}
                onChange={field.onChange}
                showPassword={showPasswordConfirm}
                togglePassword={() => setShowPasswordConfirm((prev) => !prev)}
                width="100%"
              />
            )}
          />

          {errors.passwordConfirm &&
            typeof errors.passwordConfirm.message === "string" && (
              <p className="text-red-500 text-sm">
                {errors.passwordConfirm.message}
              </p>
            )}
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={!isValid}
          className="relative w-full h-[4rem] flex items-center justify-center"
        >
          <img
            src={isValid ? ableBtn : disabledBtn}
            alt={isValid ? "수정 가능" : "수정 불가"}
            className="absolute inset-0 w-full h-full rounded-xl object-cover" //object-contain 때문에 비율에 맞게 들어간다,,
            // 이거 이미지 임시방푠으로 해논거에여ㅛㅇ..
          />
          <span className="text-white font-bold text-lg z-10">
            정보 수정 완료
          </span>
        </button>
      </form>
    </FormProvider>
  );
}
