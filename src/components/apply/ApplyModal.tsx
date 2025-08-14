import CompleteLogo from "../../assets/logo/completeLogo.svg";
import Modal from "../common/Modal";

type Props = { onClose: () => void };

const CompleteModal = ({ onClose }: Props) => {
  return (
    <Modal onClose={onClose} maxWidth="max-w-[560px]" padding="p-8">
      <div className="flex flex-col items-center text-center space-y-6">
        <img
          src={CompleteLogo}
          alt="완료 로고"
          className="w-auto h-auto max-w-full"
        />

        <div className="text-black text-2xl font-bold">크루 지원 완료!</div>

        <div className="text-black text-xl font-medium">
          합격여부를 알림으로 알려드려요
        </div>
      </div>
    </Modal>
  );
};

export default CompleteModal;
