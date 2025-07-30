import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import BasicInfoForm from "./basicInfoForm";
import PhoneNumberForm from "./phoneNumberForm";
import FormHeader from "./formHeader";
import {
  createProfileSchema,
  type CreateProfileFormValues,
} from "../../../schemas/auth/createProfileSchema";

const CreateProfileForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

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
        return <PhoneNumberForm />;
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
