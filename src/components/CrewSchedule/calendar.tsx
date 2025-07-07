import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CrewCalendar: React.FC = () => {
  const [value, setValue] = useState<Value>(new Date());

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dotDays = [6, 19, 25];
      if (date.getMonth() === 6 && dotDays.includes(date.getDate())) {
        return (
          <div
            style={{
              display: "block",
              width: "6px",
              height: "6px",
              backgroundColor: "#00C2FF",
              borderRadius: "50%",
              margin: "2px auto 0",
            }}
          ></div>
        );
      }
    }
    return null;
  };

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
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="calendar-wrapper">
      <div className="flex flex-col items-end gap-1 mb-2 pr-2">
        <div className="flex items-center gap-1 text-sm">
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#375FFF",
              display: "inline-block",
            }}
          />
          정기 모임
        </div>
        <div className="flex items-center gap-1 text-sm">
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#00C2FF",
              display: "inline-block",
            }}
          />
          번개 모임
        </div>
      </div>

      <Calendar
        onChange={(nextValue) => setValue(nextValue)}
        value={value}
        calendarType="gregory"
        tileContent={tileContent}
        locale="ko-US"
        formatDay={(locale, date) => String(date.getDate())}
        formatMonthYear={(locale, date) =>
          date.toLocaleString("en-US", { month: "long" })
        }
      />
    </div>
  );
};

export default CrewCalendar;
