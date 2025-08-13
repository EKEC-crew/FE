export const getApplyButtonText = (
  isPending: boolean,
  isApplied: boolean
): string => {
  if (isPending) return "처리중...";
  if (isApplied) return "신청완료";
  return "신청하기";
};

export const getAuthBtnText = (isPending: boolean, hasFee: boolean): string => {
  if (isPending) return "신청 중...";
  return hasFee ? "결제 및 신청하기" : "신청하기";
};

export const getApplyButtonStyle = (isApplied: boolean): string => {
  if (isApplied) {
    return "bg-[#D9DADD] text-[#5E6068]";
  }
  return "bg-[#3A3ADB] text-white";
};

export const formatScheduleDate = (dateString: string): string => {
  return new Date(dateString)
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\./g, ".")
    .slice(0, -1);
};

export const getModalTitle = (hasFee: boolean): string => {
  return hasFee ? "결제 신청 완료" : "신청 완료";
};
