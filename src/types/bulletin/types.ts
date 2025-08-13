export interface BulletinApiResponse {
  resultType: "SUCCESS" | "ERROR";
  error: string | null;
  data: {
    posts: BulletinApiData[];
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
    pageNum: number;
    pageSize: number;
  };
}

export interface BulletinDetailApiResponse {
  resultType: "SUCCESS" | "ERROR";
  error: string | null;
  data: BulletinApiData;
}

export interface BulletinApiData {
  postId: number;
  title: string;
  createdAt: string;
  nickname: string;
  commentCount: number;
  likeCount: number;
  imageCount: number;
  isPopular: boolean;
  userId: number;
  isLiked: boolean;
  // detail 필드들
  content?: string;
  profileImage?: string;
  images?: Array<{
    imageId: number;
    imageName: string;
  }>;
}

export interface Bulletin {
  id: number;
  title: string;
  date: string;
  author: string;
  commentCount: number;
  likeCount: number;
  isPopular?: boolean;
  hasAttachment?: boolean;
  userId?: number; // 추가
  isLiked?: boolean; // 추가
  // detail 필드들
  content?: string;
  profileImage?: string;
  images?: string[];
}

export interface BulletinListResponse {
  bulletins: Bulletin[];
  pagination: {
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
    pageNum: number;
    pageSize: number;
  };
}
