import ActionButton from "./ActionButton";
import addIconWt from "../../assets/icons/ic_add_36.svg";
import addBtnBg from "../../assets/icons/btn_generate_crew_260x55.svg";

const CreateCrewButton = () => {
  return (
    <ActionButton
      label="크루 만들기"
      icon={addIconWt}
      bgImage={addBtnBg}
      to="/createCrewGate"
    />
  );
};

export default CreateCrewButton;
