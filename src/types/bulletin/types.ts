export interface BulletinApiResponse {
  resultType: "SUCCESS" | "ERROR";
  error: string | null;
  data: BulletinApiData[];
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
  // detail 필드들
  content?: string;
  profileImage?: string;
  images?: string[];
}
