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

// API 데이터를 컴포넌트용 데이터로 변환
const transformBulletinData = (apiData: BulletinApiData): Bulletin => ({
  id: apiData.postId,
  title: apiData.title,
  date: formatDate(apiData.createdAt),
  author: apiData.nickname,
  commentCount: apiData.commentCount,
  likeCount: apiData.likeCount || 0,
  isPopular: apiData.isPopular,
  hasAttachment: (apiData.imageCount || 0) > 0,
  userId: apiData.userId, // 추가
  isLiked: apiData.isLiked, // 추가
  content: apiData.content,
  profileImage: apiData.profileImage,
  images: apiData.images?.map((img) => getImageUrl(img.imageName)) || [],
});

// 게시글 목록 조회 API 함수
const fetchBulletinList = async (
  crewId: number,
  page: number = 1,
  size: number = 10
): Promise<BulletinListResponse> => {
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
    throw new Error(result.error || "게시글을 불러오는데 실패했습니다.");
  }

  return {
    bulletins: result.data.posts.map(transformBulletinData),
    pagination: {
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
      hasNext: result.data.hasNext,
      pageNum: result.data.pageNum,
      pageSize: result.data.pageSize,
    },
  };
};

export const useBulletinList = (
  crewId: number,
  page: number = 1,
  size: number = 10
) => {
  return useQuery({
    queryKey: ["bulletinList", crewId, page, size],
    queryFn: () => fetchBulletinList(crewId, page, size),
    enabled: !!crewId, // crewId가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분 fresh 유지
    gcTime: 1000 * 60 * 10, // 10분 캐시 유지
  });
};

const fetchBulletinDetail = async (
  crewId: number,
  postId: number
): Promise<Bulletin> => {
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
    throw new Error(result.error || "게시글을 불러오는데 실패했습니다.");
  }

  return transformBulletinData(result.data);
};

export const useBulletinDetail = (crewId: number, postId: number) => {
  return useQuery({
    queryKey: ["bulletinDetail", crewId, postId],
    queryFn: () => fetchBulletinDetail(crewId, postId),
    enabled: !!(crewId && postId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
