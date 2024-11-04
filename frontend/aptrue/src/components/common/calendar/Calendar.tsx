import React from "react";
import useCalendar from "@/hooks/useClendar";
import styles from "./Calendar.module.scss";

const DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"];
const MONTHS = [
  "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
];

export default function Calendar() {
  const { days, currentDate, setCurrentDate, startDate, endDate, handleDateClick, firstDayOfMonth } = useCalendar();

  // 연도 선택 범위 설정
  const years = Array.from({ length: 100 }, (_, index) => new Date().getFullYear() - 50 + index); // 현재 연도 기준 ±50년

  // 월 변경 핸들러
  const handleMonthChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(event.target.value, 10);
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth));
  };

  // 연도 변경 핸들러
  const handleYearChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value, 10);
    setCurrentDate(new Date(newYear, currentDate.getMonth()));
  };

  // 시간과 분을 관리하는 상태
  const [startAmPm, setStartAmPm] = React.useState("오전");
  const [startHour, setStartHour] = React.useState("");
  const [startMinute, setStartMinute] = React.useState("");
  const [endAmPm, setEndAmPm] = React.useState("오전");
  const [endHour, setEndHour] = React.useState("");
  const [endMinute, setEndMinute] = React.useState("");

  const formattedStartTime = `${startDate?.toLocaleDateString()} ${startAmPm} ${startHour}:${startMinute}`;
  const formattedEndTime = `${endDate?.toLocaleDateString()} ${endAmPm} ${endHour}:${endMinute}`;
  console.log('시작', formattedStartTime)
  console.log('끝', formattedEndTime)

  const monthYearDropdown = (
    <div className={styles.dropDown}>
      <select value={currentDate.getMonth()} onChange={handleMonthChange}>
        {MONTHS.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
      <select value={currentDate.getFullYear()} onChange={handleYearChange}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}년
          </option>
        ))}
      </select>
    </div>
  );

  const dayList = (
    <div className={styles.week}>
      {DAY_LIST.map((day) => (
        <div key={day} style={{ fontWeight: "bold" }}>
          {day}
        </div>
      ))}
    </div>
  );

  const daysGrid = (
    <div className={styles.day}>
      {Array.from({ length: firstDayOfMonth }).map((_, index) => (
        <div key={`empty-${index}`} style={{ visibility: "hidden" }}>
          {/* 빈 셀 */}
        </div>
      ))}
      {days.map((day) => {
        const isStartDate = startDate && day.toDateString() === startDate.toDateString();
        const isEndDate = endDate && day.toDateString() === endDate.toDateString();
        const isBetweenDates = startDate && endDate && startDate < day && day < endDate;

        return (
          <button
            key={day.toDateString()}
            onClick={() => handleDateClick(day)}
            className={
              isStartDate
                ? styles.startFill
                : isEndDate
                ? styles.endFill
                : isBetweenDates
                ? styles.betweenFill
                : ""
            }
          >
            {day.getDate()}
          </button>
        );
      })}
    </div>
  );

  const startTimeSelector = startDate && (
    <div className={styles.timeCotainer}>
      <label>{startDate && startDate?.toLocaleDateString()}</label>
      <select value={startAmPm} onChange={(e) => setStartAmPm(e.target.value)}>
        <option value="오전">오전</option>
        <option value="오후">오후</option>
      </select>
      <input
        type="number"
        value={startHour}
        onChange={(e) => setStartHour(e.target.value)}
        placeholder="시"
        min="1"
        max="12"
      />
      <input
        type="number"
        value={startMinute}
        onChange={(e) => setStartMinute(e.target.value)}
        placeholder="분"
        min="0"
        max="59"
      />
    </div>
  );

  const endTimeSelector = endDate && (
    <div className={styles.timeCotainer}>
      <label>{endDate && endDate?.toLocaleDateString()}</label>
      <select value={endAmPm} onChange={(e) => setEndAmPm(e.target.value)}>
        <option value="오전">오전</option>
        <option value="오후">오후</option>
      </select>
      <input
        type="number"
        value={endHour}
        onChange={(e) => setEndHour(e.target.value)}
        placeholder="시"
        min="1"
        max="12"
      />
      <input
        type="number"
        value={endMinute}
        onChange={(e) => setEndMinute(e.target.value)}
        placeholder="분"
        min="0"
        max="59"
      />
    </div>
  );

  return (
    <div className={styles.container}>

      {/* 월과 연도 선택 드롭다운 */}
      {monthYearDropdown}
      
      {/* 요일 표시 */}
      {dayList}
      

      {/* 날짜 표시 */}
      {daysGrid}
      

      {/* 시간 선택 */}
      {startTimeSelector}
      {endTimeSelector}
     </div>
  );
}
