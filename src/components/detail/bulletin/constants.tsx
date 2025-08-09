import type { RequestCreatePostDto, ResponseCreatePostDto } from "./types";

export const CONSTANTS = {
  ITEMS_PER_PAGE: 10,
  TOTAL_PAGES: 5,
  CATEGORY: {
    NUMBER: 2,
    NAME: "게시판",
    TOTAL_COUNT: 10,
  },
  LABELS: {
    REQUIRED: "인기",
    WRITE_BUTTON: "글쓰기",
    BOTTOM_SECTION: "미술너 사네",
  },
} as const;

export const BULLETIN_LIST = [
  {
    id: 1,
    title: "오늘 왜 진거죠...?",
    date: "2025.06.18",
    author: "00000",
    isPopular: true,
    hasAttachment: true,
  },
  {
    id: 2,
    title: "이대로 10위 가는거 아닌가요?...",
    date: "2025.06.18",
    author: "00000",
    isPopular: true,
    hasAttachment: false,
  },
  {
    id: 3,
    title: "잘 부탁드립니다 ^^..",
    date: "2025.06.18",
    author: "00000",
    isPopular: true,
    hasAttachment: true,
  },
  {
    id: 4,
    title: "안녕하세요 오늘 가입했어요~",
    date: "2025.06.18",
    author: "00000",
    isPopular: false,
    hasAttachment: true,
  },
  {
    id: 5,
    title: "잠실 2030 여성 야구 직관 동호회",
    date: "2025.06.18",
    author: "00000",
    isPopular: false,
    hasAttachment: true,
  },
  {
    id: 6,
    title: "잠실 2030 여성 야구 직관 동호회",
    date: "2025.06.18",
    author: "00000",
    isPopular: false,
    hasAttachment: false,
  },
  {
    id: 7,
    title: "잠실 2030 여성 야구 직관 동호회",
    date: "2025.06.18",
    author: "00000",
    isPopular: false,
    hasAttachment: false,
  },
  {
    id: 8,
    title: "잠실 2030 여성 야구 직관 동호회",
    date: "2025.06.18",
    author: "00000",
    isPopular: false,
    hasAttachment: false,
  },
  {
    id: 9,
    title: "잠실 2030 여성 야구 직관 동호회",
    date: "2025.06.18",
    author: "00000",
    isPopular: false,
    hasAttachment: false,
  },
  {
    id: 10,
    title: "잠실 2030 여성 야구 직관 동호회",
    date: "2025.06.18",
    author: "00000",
    isPopular: false,
    hasAttachment: false,
  },
];

export const createPost = async (
  crewId: string,
  data: RequestCreatePostDto
): Promise<ResponseCreatePostDto> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${baseUrl}/crew/${crewId}/post/`;

  console.log("✅ 최종 API URL:", url);
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("userId", data.userId.toString());

  formData.append("type", data.type);
  formData.append("isRequired", String(data.isRequired));
  formData.append("fee", data.fee);
  formData.append("isFeeRequired", String(data.isFeeRequired));
  formData.append("allowComment", String(data.allowComment));
  formData.append("allowPrivateComment", String(data.allowPrivateComment));
  formData.append("allowShare", String(data.allowShare));

  (data.images || []).forEach((image) => {
    formData.append("images", image);
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("createPost 함수 에러:", error);
    throw error;
  }
};

export const fetchBulletinList = async (page = 1, size = 10, crewId = "1") => {
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/crew/${crewId}/post/list?page=${page}&size=${size}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("fetchBulletinList 에러:", error);
    throw error;
  }
};
