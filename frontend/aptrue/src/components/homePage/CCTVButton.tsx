'use client';

import { useState } from 'react';
import style from './CCTVButton.module.scss';
import Button from '../common/button/Button';

const cctvZone = [
  '101동 주변',
  '102동 주변',
  '101동 주차장',
  '102동 주차장',
  '아파트 입구',
  '정문 경비실',
  '후문 경비실',
  '지하 스포츠센터',
  '정문 어린이집',
];

export default function CCTVButton() {
  // 기본 활성 상태를 "101동 주변"으로 설정
  const [activeZone, setActiveZone] = useState<string>('101동 주변');

  const handleButtonClick = (zone: string) => {
    // 이미 활성화된 버튼을 클릭하면 비활성화, 아니면 새 버튼 활성화
    if (activeZone === zone) {
      setActiveZone(''); // 비활성화 상태로 변경
    } else {
      setActiveZone(zone); // 클릭한 버튼을 활성화 상태로 설정
    }
  };

  return (
    <div className={style.container}>
      {cctvZone.map((zone, index) => (
        <Button
          key={index}
          color={activeZone === zone ? 'blue' : 'white'} // 활성 상태에 따라 색상 변경
          size="webSmall"
          clickedColor="blue"
          active={activeZone === zone} // active prop을 boolean으로 설정
          onClick={() => handleButtonClick(zone)} // 클릭 시 활성 상태 변경
        >
          {zone}
        </Button>
      ))}
    </div>
  );
}
