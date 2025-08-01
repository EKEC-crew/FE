type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  maxWidth?: string;
  padding?: string;
};

const Modal = ({
  children,
  onClose,
  maxWidth = "max-w-[560px]",
  padding = "p-8",
}: ModalProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* 백드롭 */}
    <div className="absolute inset-0 bg-black/60" onClick={onClose} />
    {/* 모달 컨테이너 */}
    <div
      className={`relative w-full ${maxWidth} bg-white rounded-2xl ${padding}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

export default Modal;
