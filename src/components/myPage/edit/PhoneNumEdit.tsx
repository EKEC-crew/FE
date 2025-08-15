import Input from "../../../components/auth/input";
import { Controller, useFormContext } from "react-hook-form";
import type { EditProfileFormValues } from "../../../schemas/edit/editProfileSchema";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { useAuthStore } from "../../../store/useAuthStore";

const carriers = ["SKT", "KT", "LG U+", "알뜰폰"];

interface PhoneNumEditProps {
  onPassClick: (carrier: string, phone: string) => void;
}

const PhoneNumEdit = ({ onPassClick }: PhoneNumEditProps) => {
  // errors를 포함해서 구조분해
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<EditProfileFormValues>();

  // watch로 값 가져오기
  const carrier = watch("carrier");
  const phone = watch("phone");
  const isPhoneValid = /^010\d{8}$/.test(phone);
  const isPassActive = carrier !== "" && isPhoneValid;
  const { user } = useAuthStore();
  return (
    <div className="space-y-2">
      <label className="block font-semibold text-lg">전화번호</label>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2">
          {/* 커스텀 드롭다운 */}
          <Controller
            name="carrier"
            control={control}
            render={() => (
              <Listbox
                value={carrier}
                onChange={(val) => setValue("carrier", val)}
              >
                <div className="relative w-[120px]">
                  {/* 버튼 */}
                  <ListboxButton
                    className={`w-[7.5rem] h-[4.25rem] rounded-md text-sm font-semibold 
                      flex items-center justify-center focus:outline-none
                      ${
                        carrier
                          ? "bg-[#37383E] text-white border-[#37383E]"
                          : "bg-gray-200 text-black border-gray-300"
                      }`}
                  >
                    {carrier || "통신사"}
                  </ListboxButton>

                  {/* 옵션 리스트 */}
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <ListboxOptions className="absolute mt-2 w-[8.75rem] max-h-[13.75rem] overflow-auto focus:outline-none rounded-md bg-white shadow-xl z-10">
                      {carriers.map((c) => (
                        <ListboxOption
                          key={c}
                          value={c}
                          className={({ focus }) =>
                            `cursor-pointer select-none px-4 py-3 text-sm ${
                              focus ? "text-white bg-[#93959D]" : "text-black"
                            }`
                          }
                        >
                          {c}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Transition>
                </div>
              </Listbox>
            )}
          />

          {/* phone input */}
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                type="phoneNum"
                placeholder={user?.phone}
                value={field.value || ""}
                onChange={(e) =>
                  field.onChange(e.target.value.replace(/[^0-9]/g, ""))
                }
                width="100%"
                rightButtonLabel="PASS"
                onRightButtonClick={() => onPassClick(carrier, phone)}
                rightButtonDisabled={!isPassActive}
              />
            )}
          />
        </div>

        {/* 에러 메시지 */}
        {errors.phone && typeof errors.phone.message === "string" && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}

        {errors.carrier && typeof errors.carrier.message === "string" && (
          <p className="text-red-500 text-sm">{errors.carrier.message}</p>
        )}
      </div>
    </div>
  );
};

export default PhoneNumEdit;
