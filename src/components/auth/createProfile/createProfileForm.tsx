import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import BasicInfoForm from "./basicInfoForm";
import PhoneNumberForm from "./phoneNumberForm";
import FormHeader from "./formHeader";
import { useCreateProfile } from "../../../hooks/auth/useCreateProfile";
import {
  createProfileSchema,
  type CreateProfileFormValues,
} from "../../../schemas/auth/createProfileSchema";

const CreateProfileForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");

  const createProfileMutation = useCreateProfile();

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

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleProfileComplete = async () => {
    const convertGender = (genderValue: any): 0 | 1 | 2 => {
      if (genderValue === "male") return 0;
      if (genderValue === "female") return 1;
      return 2;
    };
    // 폼 데이터를 API 형식에 맞게 변환
    const profileData = {
      profileImage: "", // 기본값 or 선택된 이미지
      defaultImage: true,
      name: watchedValues.name,
      nickname: watchedValues.nickname || watchedValues.name,
      gender: convertGender(watchedValues.gender),
      phone: phoneNumber,
      birthday: parseBirthDate(watchedValues.birthDate),
    };

    try {
      await createProfileMutation.mutateAsync(profileData);
    } catch (error) {
      console.error("프로필 생성 실패:", error);
      console.error("전송된 프로필 데이터:", profileData);
    }
  };

  // 생년월일 객체화
  const parseBirthDate = (birthDateString: string) => {
    const [year, month, day] = birthDateString.split("-").map(Number);
    return { year, month, day };
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoForm
            control={control}
            watchedValues={watchedValues}
            setValue={setValue}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <PhoneNumberForm
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            onComplete={handleProfileComplete}
            isLoading={createProfileMutation.isPending}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full px-[12.86%]"
      style={{ minHeight: "calc(100vh - 9vh)", paddingTop: "9vh" }}
    >
      <FormHeader />
      {renderCurrentStep()}
    </div>
  );
};

export default CreateProfileForm;
