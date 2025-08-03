// types.ts 예시
export interface Bulletin {
  id: number;
  title: string;
  date: string;
  time: string;
  hasLabel: boolean;
  labelText?: string;
  author?: string; // 작성자 필드 추가
  content?: string; // 내용 필드 (필요시)
}

export interface NoticeItemProps {
  Bulletin: Bulletin;
  onNoticeClick?: (notice: Bulletin) => void;
  index: number;
}