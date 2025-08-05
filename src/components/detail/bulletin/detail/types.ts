export interface Bulletin {
  id: number;
  title: string;
  date: string;
  time: string;
  hasLabel: boolean;
  labelText?: string;
  author?: string; 
  content?: string; 
  type: string;
  permission: string[]; 
  fee: number; 

}

export interface NoticeItemProps {
  Bulletin: Bulletin;
  onNoticeClick?: (notice: Bulletin) => void;
  index: number;
}