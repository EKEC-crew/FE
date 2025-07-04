import { useState } from "react";
import userIconBk from "../../assets/icons/ic_UserCircle_36.svg";
import userIconWt from "../../assets/icons/ic_UserCircle_ white_36.svg";
import pressedRadioBtn from "../../assets/icons/ic_radio_pressed.svg";
import depressedRadioBtn from "../../assets/icons/ic_radio_de.svg";
//더미데이터
const exCrews = ["ex크루1", "ex크루2", "ex크루3"];

const LeftGnbMyCrew = () => {
  const [isOpen, setOpen] = useState(false);
  const [isSelected, setSelected] = useState("");

  return (
    <div>
      <button
        onClick={() => setOpen(!isOpen)}
        className={`flex items-center gap-2 w-full h-[48px] text-left px-4 py-2 rounded-[8px] transition-colors focus:outline-none ${
          isOpen
            ? "bg-[#3A3ADB] text-white"
            : "bg-[#F7F7FB] text-black hover:bg-[#3A3ADB] hover:text-white"
        }`}
      >
        <img
          src={isOpen ? userIconWt : userIconBk}
          alt="유저아이콘"
          className="w-7 h-7 object-contain align-middle"
          style={{ marginTop: "-3px" }}
        />
        My 크루
      </button>
      {/*토글을 눌렀을때 나오는 내 크루(현재는 더미데이터 사용)*/}
      {isOpen && (
        <div className="ml-3 mt-3 space-y-2">
          {exCrews.map((crew) => (
            <label
              key={crew}
              className={`flex items-center w-full h-[48px] gap-2 text-sm px-4 py-2 rounded-[10px] cursor-pointer transition-colors ${
                isSelected === crew
                  ? "bg-[#F7F7FB] text-black"
                  : "hover:bg-[#F7F7FB]  text-black"
              }`}
            >
              <input
                type="radio"
                name="myCrew"
                value={crew}
                checked={isSelected === crew}
                onChange={() => setSelected(crew)}
                className="hidden"
              />
              <img
                src={isSelected === crew ? pressedRadioBtn : depressedRadioBtn}
                alt="radio"
                className="w-5 h-5"
              />
              {crew}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeftGnbMyCrew;
