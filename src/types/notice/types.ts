export interface Notice {
  content: string | TrustedHTML;
  id: number;
  title: string;
  date: string;
  time: string;
  hasLabel: boolean;
  labelText?: string;
  likeCount?: number;
  liked?: boolean;
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