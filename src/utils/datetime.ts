// src/utils/datetime.ts
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

// Asia/Seoul 로 표시
export function formatKST(iso: string, fmt = "YYYY.MM.DD HH:mm") {
  return dayjs(iso).tz("Asia/Seoul").format(fmt);
}
