export const CONSTANTS = {
  ITEMS_PER_PAGE: 10,
  TOTAL_PAGES: 5,
  CATEGORY: {
    NUMBER: 2,
    NAME: '공지',
    TOTAL_COUNT: 4
  },
  LABELS: {
    REQUIRED: '필독',
    WRITE_BUTTON: '글쓰기',
    BOTTOM_SECTION: '미술너 사네'
  }
} as const;

// 공통 데이터 객체
export const NOTICE_DATA = {
  title: "잠실 2030 여성 야구 직관 동호회",
  date: "2025.06.18",
  time: "0000"
} as const;

export const generateNoticeData = () => {
  return Array.from({ length: CONSTANTS.ITEMS_PER_PAGE }, (_, index) => ({
    id: index + 1,
    ...NOTICE_DATA,
    hasLabel: index < 3,
    labelText: index < 3 ? CONSTANTS.LABELS.REQUIRED : undefined
  }));
};