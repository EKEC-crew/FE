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

export interface RequestCreatePostDto {
  title: string;
  content: string;
  userId: number;
  images?: File[];
  type: string;
  isRequired?: boolean;
  fee: string;
  isFeeRequired?: boolean;
  feePurpose?: string;
  allowComment?: boolean;
  allowPrivateComment?: boolean;
  allowShare?: boolean;
}

export interface ResponseCreatePostDto {
  resultType: "SUCCESS" | "FAIL";
  error: null | {
    errorCode: string;
    reason: string;
    data: {};
  };
  data?: {
    postId: number;
    title: string;
    content: string;
    createdAt: string;
    nickname: string;
    profileImage: string;
    commentCount: number;
    likeCount: number;
    images: Array<{
      imageId: number;
      imageName: string;
    }>;
  };
}