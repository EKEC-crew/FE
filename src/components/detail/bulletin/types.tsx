// src/components/detail/notice/types.tsx
export interface Notice {
  id: number;
  title: string;
  date: string;
  time: string;
  hasLabel: boolean;
  labelText?: string;
}

export interface NoticeItemProps {
  notice: Notice;
  onNoticeClick?: (notice: Notice) => void;
  index: number;
}

export interface HeaderProps {
  categoryNumber: number;
  categoryName: string;
  totalCount: number;
}