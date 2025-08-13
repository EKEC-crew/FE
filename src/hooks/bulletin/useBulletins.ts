import { useQuery } from "@tanstack/react-query";
import type {
  BulletinApiResponse,
  BulletinDetailApiResponse,
  BulletinApiData,
  Bulletin,
  BulletinListResponse,
} from "../../types/bulletin/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getImageUrl = (imageName: string): string => {
  return `${API_BASE_URL}/image?type=2&fileName=${imageName}`;
};

// 날짜 포맷
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } else if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  } else {
    return date.toLocaleDateString("ko-KR", {
      month: "2-digit",
      day: "2-digit",
    });
  }
};

// 게시글 데이터 변환 함수
const transformBulletinData = (data: BulletinApiData): Bulletin => ({
  id: data.postId,
  title: data.title,
  date: formatDate(data.createdAt),
  author: data.nickname,
  commentCount: data.commentCount,
  likeCount: data.likeCount || 0,
  isPopular: data.isPopular,
  hasAttachment: (data.imageCount || 0) > 0,
  userId: data.userId,
  isLiked: data.isLiked,
  content: data.content,
  profileImage: data.profileImage,
  images: data.images?.map((img) => getImageUrl(img.imageName)) || [],
  originalImages: data.images || [],
});

// 게시글 목록 조회
export const useBulletins = (crewId: number, page = 1, size = 10) => {
  return useQuery({
    queryKey: ["bulletins", crewId, page, size],
    queryFn: async (): Promise<BulletinListResponse> => {
      const response = await fetch(
        `${API_BASE_URL}/crew/${crewId}/post/list?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: BulletinApiResponse = await response.json();

      if (result.resultType !== "SUCCESS") {
        throw new Error(
          typeof result.error === "string"
            ? result.error
            : result.error?.reason || "게시글을 불러오는데 실패했습니다."
        );
      }

      const data = result.data;
      if (!data) {
        throw new Error("게시글 데이터를 찾을 수 없습니다.");
      }

      return {
        bulletins: data.posts.map(transformBulletinData),
        pagination: {
          totalElements: data.totalElements,
          totalPages: data.totalPages,
          hasNext: data.hasNext,
          pageNum: data.pageNum,
          pageSize: data.pageSize,
        },
      };
    },
    enabled: !!crewId,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
};

// 게시글 상세 조회
export const useBulletin = (crewId: number, postId: number) => {
  return useQuery({
    queryKey: ["bulletin", crewId, postId],
    queryFn: async (): Promise<Bulletin> => {
      const response = await fetch(
        `${API_BASE_URL}/crew/${crewId}/post/${postId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: BulletinDetailApiResponse = await response.json();

      if (result.resultType !== "SUCCESS") {
        throw new Error(
          typeof result.error === "string"
            ? result.error
            : result.error?.reason || "게시글을 불러오는데 실패했습니다."
        );
      }

      const data = result.data;
      if (!data) {
        throw new Error("게시글 데이터를 찾을 수 없습니다.");
      }

      return transformBulletinData(data);
    },
    enabled: !!(crewId && postId),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
};

// 별칭 추가 (기존 코드 호환성을 위해)
export const useBulletinDetail = useBulletin;
