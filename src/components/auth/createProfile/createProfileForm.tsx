import { useState } from "react";
import { Link } from "react-router-dom";

import nextBtn from "../../../assets/signIn/btn_login_520x68.svg";
import addProfileImage from "../../../assets/icons/createProfile/addProfileImage.svg";

import BirthDropDown from "./birthDropDown";
import Input from "../input";
import GenderSelect from "./genderSelect";

const CreateProfileForm = () => {
  const [isDefine, setIsDefine] = useState(false);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

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
      <Input
        type="text"
        placeholder="이름을 입력하세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
        width="27.08vw"
      />

      <div className="mb-2" style={{ width: "27.08vw" }}>
        <span className="text-zinc-800 text-xl font-semibold">닉네임</span>
        <span className="text-red-500 text-lg font-normal ml-[0.47vw]">
          설정 이후 수정이 가능해요*
        </span>
      </div>
      <div className="flex items-start gap-[1.04vw]">
        <Input
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          width="19.79vw"
        />
        <button
          className="h-12 md:h-14 lg:h-16 bg-gray-200 rounded-[10px] border-2 border-stone-300 text-zinc-800 text-sm md:text-base lg:text-lg font-medium hover:bg-gray-300 transition-colors"
          style={{ width: "6.25vw" }}
        >
          건너뛰기
        </button>
      </div>

      <GenderSelect
        selectedGender={selectedGender}
        onGenderChange={setSelectedGender}
        isNotDefine={isDefine}
        onNotDefineChange={setIsDefine}
      />

      <div className="mb-2" style={{ width: "27.08vw" }}>
        <span className="text-zinc-800 text-xl font-semibold">생년월일</span>
        <span className="text-red-500 text-xl font-semibold">*</span>
      </div>

      <BirthDropDown />
      <Link
        to="/createProfile/phoneNumber"
        className="w-full max-w-[32.5rem] relative flex items-center justify-center h-12 md:h-14 lg:h-[4.25rem] transition-all duration-200 hover:opacity-90 active:transform active:translate-y-0.5 mb-6"
      >
        <img
          src={nextBtn}
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
