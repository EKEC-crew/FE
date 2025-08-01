import CompleteLogo from "../../../assets/logo/completeLogo.svg";

const CompleteModal = () => {
  return (
    <div className="w-full max-w-[560px] h-auto min-h-[552px] bg-white rounded-[20px] flex flex-col items-center justify-center p-8 mx-auto">
      <div className="flex flex-col items-center text-center space-y-6">
        <img
          src={CompleteLogo}
          alt="완료 로고"
          className="w-auto h-auto max-w-full"
        />

        <div className="text-black text-2xl font-bold">
          이크에크에 오신걸 환영합니다!
        </div>

        <div className="text-black text-xl font-medium">
          자신에게 맞는 크루원을 찾아 활동해보세요
        </div>
      </div>
    </div>
  );
};

export default CompleteModal;
