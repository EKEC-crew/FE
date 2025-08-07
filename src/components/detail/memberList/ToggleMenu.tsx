interface ToggleMenuProps {
  role?: string; // 해당 멤버의 역할 (운영진 or 일반멤버)
  isLeader: boolean; // 로그인 계정이 크루장인지 여부
  isManager: boolean; // 로그인 계정이 운영진인지 여부
  onClose: () => void;
  onKick: () => void;
  onRoleChange: () => void;
  onWarn: () => void;
}

export default function ToggleMenu({
  role,
  isLeader,
  isManager,
  onClose,
  onKick,
  onRoleChange,
  onWarn,
}: ToggleMenuProps) {
  return (
    <div className="absolute right-0 mt-2 w-[11.5rem] rounded-[0.625rem] bg-white shadow-lg text-sm z-10">
      {/*  크루장일 때 */}
      {isLeader && (
        <>
          {role === "크루장" ? (
            <>
              <button
                disabled
                className="block w-full h-[2.9375rem] px-[0.5rem] py-[0.25rem] text-left bg-[#EFF0F4] text-gray-400 cursor-not-allowed"
              >
                운영진 승격
              </button>
              <button
                disabled
                className="block w-full h-[2.9375rem] px-[0.5rem] py-[0.25rem] text-left bg-[#EFF0F4] text-gray-400 cursor-not-allowed"
              >
                경고하기
              </button>
              <button
                disabled
                className="block w-full h-[2.9375rem] px-[0.5rem] py-[0.25rem] text-left bg-[#EFF0F4] text-gray-400 cursor-not-allowed"
              >
                방출하기
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  onRoleChange();
                  onClose();
                }}
                className="block w-full h-[2.9375rem] px-[0.5rem] py-[0.25rem] text-left hover:bg-[#EFF0F4]"
              >
                {role === "운영진" ? "운영진 제외" : "운영진 승격"}
              </button>
              <button
                onClick={() => {
                  onWarn();
                  onClose();
                }}
                className="block w-full h-[2.9375rem] px-[0.5rem] py-[0.25rem] text-left hover:bg-[#EFF0F4]"
              >
                경고하기
              </button>
              <button
                onClick={() => {
                  onKick();
                  onClose();
                }}
                className="block w-full h-[2.9375rem] px-[0.5rem] py-[0.25rem] text-left hover:bg-[#EFF0F4] text-red-500"
              >
                방출하기
              </button>
            </>
          )}
        </>
      )}

      {/* 운영진일 때 */}
      {isManager && (
        <>
          {role === "운영진" || role === "크루장" ? (
            <>
              <button
                disabled
                className="block w-full h-[2.9375rem] px-[0.5rem] py-[0.25rem] text-left bg-[#EFF0F4] text-gray-400 cursor-not-allowed"
              >
                경고하기
              </button>
              <button
                disabled
                className="block w-full h-[2.9375rem] px-[0.5rem] py-[0.25rem] text-left bg-[#EFF0F4] text-gray-400 cursor-not-allowed"
              >
                방출하기
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  onWarn();
                  onClose();
                }}
                className="block w-full h-[2.9375rem] px-[0.5rem] py-[0.25rem] text-left hover:bg-[#EFF0F4]"
              >
                경고하기
              </button>
              <button
                onClick={() => {
                  onKick();
                  onClose();
                }}
                className="block w-full h-[2.9375rem] px-[0.5rem] py-[0.25rem] text-left hover:bg-[#EFF0F4] text-red-500"
              >
                방출하기
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
