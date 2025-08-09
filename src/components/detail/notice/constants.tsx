export const CONSTANTS = {
  ITEMS_PER_PAGE: 10,
  TOTAL_PAGES: 5,
  CATEGORY: {
    NUMBER: 2,
    NAME: '공지',
    TOTAL_COUNT: 4,
  },
  LABELS: {
    REQUIRED: '필독',
    WRITE_BUTTON: '글쓰기',
    BOTTOM_SECTION: '미술너 사네',
  },
} as const;

export const NOTICE_DATA = {
  title: "잠실 2030 여성 야구 직관 동호회",
  date: "2025.06.18",
  time: "0000",
} as const;

export const generateNoticeData = () => {
  return Array.from({ length: CONSTANTS.ITEMS_PER_PAGE }, (_, index) => ({
    id: index + 1,
    ...NOTICE_DATA,
    hasLabel: index < 3,
    labelText: index < 3 ? CONSTANTS.LABELS.REQUIRED : undefined,
  }));
};

// ✅ 공지 목록 조회
export const fetchNoticeList = async (crewId: string) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/crew/${crewId}/notice/`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("fetchNoticeList 에러:", error);
    throw error;
  }
};

export const createNotice = async (
  crewId: string,
  title: string,
  content: string
) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/crew/${crewId}/notice/`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("공지 생성 에러:", error);
    throw error;
  }
};
  
// ✅ 공지 상세 조회
export const getNoticeDetail = async (crewId: string, noticeId: string) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/crew/${crewId}/notice/${noticeId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("공지 상세 조회 에러:", err);
    throw err;
  }
};
