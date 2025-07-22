import DropDown from "./dropDown";
import { useState, useEffect } from "react";

interface BirthDropDownProps {
  birthDate?: string;
  setBirthDate: (date: string) => void;
}

const BirthDropDown = ({ birthDate, setBirthDate }: BirthDropDownProps) => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    if (birthDate) {
      const [y, m, d] = birthDate.split("-");
      setYear(y || "");
      setMonth(m || "");
      setDay(d || "");
    }
  }, [birthDate]);

  useEffect(() => {
    if (year && month && day) {
      setBirthDate(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
    } else {
      setBirthDate("");
    }
  }, [year, month, day, setBirthDate]);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const getDaysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate();
  const days =
    year && month
      ? Array.from({ length: getDaysInMonth(+year, +month) }, (_, i) => i + 1)
      : Array.from({ length: 31 }, (_, i) => i + 1);

  const yearOptions = years.map((y) => ({
    value: y.toString(),
    label: y.toString(),
  }));
  const monthOptions = months.map((m) => ({
    value: m.toString(),
    label: m.toString().padStart(2, "0"),
  }));
  const dayOptions = days.map((d) => ({
    value: d.toString(),
    label: d.toString().padStart(2, "0"),
  }));

  return (
    <div
      className="flex justify-between items-center mb-6"
      style={{ width: "27.08vw" }}
    >
      <DropDown
        width="8.33vw"
        height="4.63vh"
        placeholder={`${currentYear}년생`}
        options={yearOptions}
        value={year}
        onChange={setYear}
      />
      <DropDown
        width="8.33vw"
        height="4.63vh"
        placeholder={`${String(currentMonth).padStart(2, "0")}월`}
        options={monthOptions}
        value={month}
        onChange={setMonth}
      />
      <DropDown
        width="8.33vw"
        height="4.63vh"
        placeholder={`${String(currentDay).padStart(2, "0")}일`}
        options={dayOptions}
        value={day}
        onChange={setDay}
      />
    </div>
  );
};

export default BirthDropDown;
