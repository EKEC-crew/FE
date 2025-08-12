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

// ✅ 공지 수정
export const updateNotice = async (
  crewId: string,
  noticeId: string,
  payload: {
    title: string;
    content: string;
    type?: string;
    isRequired?: boolean;
    allowComment?: boolean;
    allowPrivateComment?: boolean;
    allowShare?: boolean;
    fee?: string | number;
    isFeeRequired?: boolean;
    feePurpose?: string;
    images?: string[]; // existing image URLs to keep
  }
) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/crew/${crewId}/notice/${noticeId}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("공지 수정 에러:", error);
    throw error;
  }
};

// ✅ 공지 삭제
export const deleteNotice = async (
  crewId: string,
  noticeId: string
) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/crew/${crewId}/notice/${noticeId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
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
    console.error("공지 삭제 에러:", error);
    throw error;
  }
};



// ✅ 공지 좋아요 추가
export const likeNotice = async (crewId: string, noticeId: string) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/crew/${crewId}/notice/${noticeId}/like`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ 추가
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
      body: JSON.stringify({}), // ✅ 빈 객체라도 넣어서 JSON 요청으로
    });

    let json: any = null;
    try {
      json = await response.json();
    } catch {
      json = null;
    }

    if (!response.ok) {
      if (json?.error?.errorCode === "ALREADY_LIKED") {
        return json;
      }
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${json ? JSON.stringify(json) : ""}`
      );
    }
    return json;
  } catch (error: any) {
    const message = String(error?.message || "");
    if (message.includes("ALREADY_LIKED")) {
      return { resultType: "FAIL", error: { errorCode: "ALREADY_LIKED" } } as any;
    }
    throw error;
  }
};

export const unlikeNotice = async (crewId: string, noticeId: string) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/crew/${crewId}/notice/${noticeId}/like`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
    });

    let json: any = null;
    try {
      json = await response.json();
    } catch {
      json = null;
    }

    if (!response.ok) {
      // 스펙: 404 → LIKE_NOT_FOUND
      if (json?.error?.errorCode === "LIKE_NOT_FOUND") {
        return json; // 호출부에서 분기 처리(동기화)
      }
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${
          json ? JSON.stringify(json) : ""
        }`
      );
    }

    // 성공 스펙 예: { resultType: "SUCCESS", data: { message: "좋아요가 취소되었습니다." } }
    return json;
  } catch (error: any) {
    const message = String(error?.message || "");
    if (message.includes("LIKE_NOT_FOUND")) {
      return {
        resultType: "FAIL",
        error: { errorCode: "LIKE_NOT_FOUND" },
      } as any;
    }
    console.error("좋아요 취소 에러:", error);
    throw error;
  }
};
// ✅ 공지 댓글 목록 조회
export const fetchNoticeComments = async (crewId: string, noticeId: string) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/crew/${crewId}/notice/${noticeId}/comment/`;

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
    console.error("공지 댓글 목록 조회 에러:", error);
    throw error;
  }
};