import { useState } from "react";
import ToggleListButton from "./ToggleListButton";
import userIconBk from "../../assets/icons/ic_UserCircle_36.svg";
import userIconWt from "../../assets/icons/ic_UserCircle_ white_36.svg";

const MyCrewButton = () => {
  // 임시 더미데이터 (API 연결 전)
  const [myCrewList] = useState<string[]>([
    "마이 크루 1",
    "마이 크루 2",
    "마이 크루 3",
  ]);
  const [selectedCrew, setSelectedCrew] = useState("");

  return (
    <ToggleListButton
      title="My 크루"
      iconDefault={userIconBk}
      iconActive={userIconWt}
      items={myCrewList}
      selected={selectedCrew}
      setSelected={setSelectedCrew}
      name="myCrew"
    />
  );
};

export default MyCrewButton;
