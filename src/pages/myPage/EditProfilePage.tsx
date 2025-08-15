import { FormProvider, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 추가

import { editProfileSchema } from "../../schemas/edit/editProfileSchema";
import Input from "../../components/auth/input";
import BirthDropDown from "../../components/auth/createProfile/birthDropDown";
import GenderSelect from "../../components/auth/createProfile/genderSelect";
import PhoneNumEdit from "../../components/myPage/edit/PhoneNumEdit";
import Modal from "../../components/common/Modal";

import ableBtn from "../../assets/signIn/btn_login_520x68.svg";
import disabledBtn from "../../assets/buttons/disabled.svg";
import { useAuthStore } from "../../store/useAuthStore";
import { privateAPI } from "../../apis/axios";
import successIcon from "../../assets/icons/img_graphic2_340.svg";
import failIcon from "../../assets/icons/img_graphic3_340.svg";

export default function EditProfilePage() {
  // 서버에서 받아온 기본값
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate(); // navigate 추가

  // 모달 상태 추가
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // 날짜 문자열을 객체로 변환하는 함수
  const parseBirthDate = (birthDateString: string) => {
    const [year, month, day] = birthDateString.split("-").map(Number);

    const birthdayObject: any = {};
    birthdayObject["year"] = Number(year);
    birthdayObject["month"] = Number(month);
    birthdayObject["day"] = Number(day);

    return birthdayObject;
  };

  // 헬퍼 함수들 (올바른 매핑)
  const getGenderFromNumber = (
    genderNum: number
  ): "male" | "female" | "not-defined" => {
    switch (genderNum) {
      case 0:
        return "not-defined"; // 0: 밝히지 않음
      case 1:
        return "male"; // 1: 남성
      case 2:
        return "female"; // 2: 여성
      default:
        return "male";
    }
  };

  const getGenderNumber = (
    gender: "male" | "female" | "not-defined"
  ): number => {
    switch (gender) {
      case "not-defined":
        return 0; // 밝히지 않음: 0
      case "male":
        return 1; // 남성: 1
      case "female":
        return 2; // 여성: 2
      default:
        return 1;
    }
  };

  const defaultValues = {
    name: user?.name,
    nickname: user?.nickname,
    gender: user?.gender,
    birthDate: user?.birth,
    phone: user?.phone,
    carrier: "",
    password: "",
    passwordConfirm: "",
  };

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

  // 생년월일 표시용 - 날짜 부분만 추출
  const birthDate = user?.birth ? user.birth.split("T")[0] : ""; // "2002-01-27"

  const [gender, setGender] = useState<"male" | "female" | "not-defined">(
    getGenderFromNumber(user?.gender ?? 0)
  );

  // 이전 성별 기억하기 위한 상태 (수정됨)
  const [previousGender, setPreviousGender] = useState<"male" | "female">(
    () => {
      const genderStr = getGenderFromNumber(user?.gender ?? 0);
      return genderStr === "not-defined"
        ? "male"
        : (genderStr as "male" | "female");
    }
  );

  const [isNotDefine, setIsNotDefine] = useState(user?.gender === 0); // 0: 밝히지 않음
  const watchedValues = watch();

  console.log("watchedValues", watchedValues);
  console.log("validation", editProfileSchema.safeParse(watchedValues));

  // validation을 기존 스키마에 맞춰서 수정
  const isValid = editProfileSchema.safeParse({
    name: user?.name,
    nickname: watchedValues.nickname,
    gender: user?.gender,
    birthday: user?.birth,
    phone: user?.phone,
    carrier: watchedValues.carrier || "",
    password: watchedValues.password || "",
    passwordConfirm: watchedValues.passwordConfirm || "",
  }).success;

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const onSubmit = async (data: any) => {
    const birthdayData = user?.birth
      ? parseBirthDate(user.birth.split("T")[0])
      : null;

    // FormData 객체 생성 (multipart/form-data용)
    const formData = new FormData();
    formData.append("profileImage", user?.profileImage || "");
    formData.append("defaultImage", String(user?.defaultImage || false));
    formData.append("name", user?.name || "");
    formData.append("nickname", data.nickname || "");
    formData.append("gender", String(getGenderNumber(gender)));
    formData.append("phone", user?.phone || "");
    formData.append("birthday", JSON.stringify(birthdayData));

    console.log("전체 제출 데이터 (FormData):");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await privateAPI.post("/auth/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("프로필 수정 성공:", response.data);

      // 성공 후 처리
      if (response.data.resultType === "SUCCESS") {
        const updatedUser = response.data.data;

        // zustand store 업데이트 - 화면 리렌더링 트리거
        setUser(updatedUser);

        // 프로필 이미지가 변경된 경우 아바타도 다시 로드
        if (updatedUser.profileImage !== user?.profileImage) {
          await useAuthStore.getState().loadAvatar();
        }

        // 성공 모달 표시
        setShowSuccessModal(true);
      }
    } catch (error: any) {
      console.error("프로필 수정 실패:", error);
      console.error("에러 응답:", error.response?.data);
      // 에러 모달 표시
      setShowErrorModal(true);
    }
  };

  // 성공 모달 확인 버튼 핸들러
  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    navigate("/"); // 홈으로 이동
  };

  return (
    <>
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

          {/* 성별 (밝히지 않음 옵션만 수정 가능) */}
          <div>
            <label className="block font-semibold text-lg mb-1">성별</label>
            <GenderSelect
              selectedGender={gender}
              onGenderChange={(newGender) => {
                if (newGender !== "not-defined") {
                  setPreviousGender(newGender as "male" | "female");
                }
                setGender(newGender);
              }}
              isNotDefine={isNotDefine}
              onNotDefineChange={(checked) => {
                setIsNotDefine(checked);
                if (checked) {
                  setGender("not-defined");
                } else {
                  setGender(previousGender);
                }
              }}
              disabled={true}
              notDefineDisabled={false}
              originalGender={
                getGenderFromNumber(user?.gender ?? 0) === "not-defined"
                  ? "male"
                  : (getGenderFromNumber(user?.gender ?? 0) as
                      | "male"
                      | "female")
              }
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
              className="absolute inset-0 w-full h-full rounded-xl object-cover"
            />
            <span className="text-white font-bold text-lg z-10">
              정보 수정 완료
            </span>
          </button>
        </form>
      </FormProvider>

      {/* 성공 모달 */}
      {showSuccessModal && (
        <Modal
          onClose={() => setShowSuccessModal(false)}
          maxWidth="max-w-[600px]"
        >
          <div className="text-center">
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center mb-4">
                <img
                  src={successIcon}
                  alt="성공"
                  className="w-[340px] h-[340px]"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                수정 완료
              </h2>
              <p className="text-gray-600">
                프로필이 성공적으로 수정되었습니다!
              </p>
            </div>
            <button
              onClick={handleSuccessConfirm} // 핸들러 함수로 변경
              className="w-full bg-[#3A3ADB] text-white py-3 px-4 rounded-lg font-medium"
            >
              확인
            </button>
          </div>
        </Modal>
      )}

      {/* 에러 모달 */}
      {showErrorModal && (
        <Modal
          onClose={() => setShowErrorModal(false)}
          maxWidth="max-w-[600px]"
        >
          <div className="text-center">
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center mb-4">
                <img
                  src={failIcon}
                  alt="실패"
                  className="w-[340px] h-[340px]"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                수정 실패
              </h2>
              <p className="text-gray-600">
                프로필 수정에 실패했습니다.
                <br />
                다시 시도해주세요.
              </p>
            </div>
            <button
              onClick={() => setShowErrorModal(false)}
              className="w-full bg-[#3A3ADB] text-white py-3 px-4 rounded-lg font-medium"
            >
              확인
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
