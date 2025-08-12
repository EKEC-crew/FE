import { useEffect } from "react";

export const useCalendarStyles = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .react-calendar {
        border: none !important;
        box-shadow: none !important;
        font-family: sans-serif;
      }

      .react-calendar__navigation__prev-button,
      .react-calendar__navigation__next-button,
      .react-calendar__navigation__prev2-button,
      .react-calendar__navigation__next2-button {
        display: none !important;
      }

      .react-calendar__navigation__label {
        font-size: 1.4rem;
        font-weight: bold;
        text-transform: uppercase;
        justify-content: center;
      }

      .react-calendar__navigation__label::before {
        font-weight: bold;
        text-transform: uppercase;
        font-size: 1.2rem;
      }

      .react-calendar__month-view__weekdays {
        background-color: #f3f4f6;
        border-radius: 0.5rem; 
        padding: 0.5rem 0;
        margin-bottom: 0.5rem;
      }
      
      .react-calendar__month-view__weekdays__weekday:nth-child(1) {
        color: red;
      }

      .react-calendar__tile abbr {
        font-size: 0.9rem;
      }

      .react-calendar__tile abbr::after {
        content: "";
      }

      /* 현재 날짜 스타일 - 배경색 제거 */
      .react-calendar__tile--now {
        background: transparent !important;
        color: #374151 !important;
        font-weight: bold;
        border: 2px solid #f59e0b !important;
        border-radius: 6px !important;
      }

      /* 선택된 날짜 스타일 - 그림자 효과 */
      .react-calendar__tile--active {
        background: #ffffff !important;
        color: #374151 !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 6px !important;
        transform: translateY(-1px);
      }

      /* 호버 효과 */
      .react-calendar__tile:hover {
        background: #f9fafb !important;
        border-radius: 6px !important;
      }

      /* 일반 타일 스타일 */
      .react-calendar__tile {
        background: transparent !important;
        border: none !important;
        transition: all 0.2s ease-in-out;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);
};
