'use client';

import CCTVScreen from './CCTV/CCTVScreen';
import CCTVButton from './CCTVButton';
import style from './CCTVHome.module.scss';
import { useState } from 'react';

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

const videoUrls = [
  '/videos/entrance.mp4',
  '/videos/park2.mp4',
  '/videos/park.mp4',
  '/videos/playground.mp4',
];

export default function CCTVHome() {
  const [activeZone, setActiveZone] = useState<string>('101동 주변');
  const [randomVideos, setRandomVideos] = useState<string[]>(videoUrls);

  const handleZoneChange = (zone: string) => {
    setActiveZone(zone);

    // videoUrls 배열을 랜덤하게 섞음
    const shuffledVideos = [...videoUrls].sort(() => Math.random() - 0.5);
    setRandomVideos(shuffledVideos);
  };

  return (
    <div>
      <div className={style.button}>
        <CCTVButton
          activeZone={activeZone}
          setActiveZone={handleZoneChange}
          cctvZone={cctvZone}
        />
      </div>
      <div className={style.cctvContainer}>
        <CCTVScreen
          activeZone={activeZone}
          camNumber={1}
          videoUrl={randomVideos[0]}
        />
        <CCTVScreen
          activeZone={activeZone}
          camNumber={2}
          videoUrl={randomVideos[1]}
        />
        <CCTVScreen
          activeZone={activeZone}
          camNumber={3}
          videoUrl={randomVideos[2]}
        />
        <CCTVScreen
          activeZone={activeZone}
          camNumber={4}
          videoUrl={randomVideos[3]}
        />
      </div>
    </div>
  );
}
