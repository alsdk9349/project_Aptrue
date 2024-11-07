'use client';
import style from './cctv.module.scss';
import { useEffect, useRef, useState } from 'react';

interface CCTVClipProps {
  clipList: string[];
}

export default function CCTVClip({ clipList }: CCTVClipProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // 비디오가 끝날 때 다음 비디오로 이동하거나 리스트의 시작으로 돌아감
    const handleEnded = () => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex < clipList.length) {
          videoElement.src = clipList[nextIndex];
          videoElement.play();
          return nextIndex;
        } else {
          // 모든 비디오 재생이 끝났을 때 처음으로 돌아감
          videoElement.src = clipList[0];
          videoElement.play();
          return 0;
        }
      });
    };

    videoElement.addEventListener('ended', handleEnded);

    return () => {
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, [clipList]);

  // 드롭다운에서 선택한 비디오 재생 시작
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = parseInt(event.target.value, 10);
    setCurrentIndex(selectedIndex);

    // 선택한 비디오를 바로 재생
    if (videoRef.current) {
      videoRef.current.src = clipList[selectedIndex];
      videoRef.current.play();
    }
  };

  return (
    <div className={style['video-container']}>
      <div className={style.dropDown}>
        <div>
          {/* 드롭다운 메뉴 */}
          <select value={currentIndex} onChange={handleSelectChange}>
            {clipList.map((clip, index) => (
              <option key={index} value={index}>
                비디오 {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div>
          현재 비디오: {currentIndex + 1} / {clipList.length}
        </div>
      </div>

      {/* 비디오 플레이어 */}
      <video
        className={style.videoBox}
        ref={videoRef}
        src={clipList[currentIndex]} // 선택된 비디오로 초기화
        controls
        autoPlay
        muted
        loop={false} // 전체 비디오 리스트를 반복할 때 필요하지 않음
        controlsList="noremoteplayback nodownload"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        draggable="false"
      ></video>
    </div>
  );
}
