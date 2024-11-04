'use client';

import { useState } from 'react';
import styles from './TimeInput.module.scss';

export default function TimeInput({
  onChange,
  isWeb,
}: {
  onChange: (inputValue: string) => void;
  isWeb: boolean;
}) {
  const [inputValue, setInputValue] = useState<string>('');
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);

  const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onChange(value);
  };

  const clickCalendar = () => {
    setOpenCalendar(!openCalendar);
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        {'요청시간'.split('').map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          placeholder="yyyy.mm.dd hh:mm - yyyy.mm.dd hh:mm"
          onChange={onChangeInputValue}
          className={isWeb ? styles.web : styles.app}
        />
        <img
          src="/icons/calendarIcon.png"
          alt="calendarIcon"
          onClick={clickCalendar}
        />
      </div>
      {openCalendar && (
        <div className={styles.calendarContainer}>캘린더오픈</div>
      )}
    </div>
  );
}
