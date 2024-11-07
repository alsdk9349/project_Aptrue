// 'use client';

// import CCTVScreen from './CCTV/CCTVScreen';
// import CCTVButton from './CCTVButton';
// import style from './CCTVHome.module.scss';
// import { useState } from 'react';

// const cctvZone = [
//   '101동 주변',
//   '102동 주변',
//   '101동 주차장',
//   '102동 주차장',
//   '아파트 입구',
//   '정문 경비실',
//   '후문 경비실',
//   '지하 스포츠센터',
//   '정문 어린이집',
// ];

// const videoUrls = [
//   '/videos/entrance.mp4',
//   '/videos/park2.mp4',
//   '/videos/park.mp4',
//   '/videos/playground.mp4',
// ];

// export default function CCTVHome() {
//   const [activeZone, setActiveZone] = useState<string>('101동 주변');
//   const [randomVideos, setRandomVideos] = useState<string[]>(videoUrls);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');

//   const handleZoneChange = (zone: string) => {
//     setActiveZone(zone);
//     const shuffledVideos = [...videoUrls].sort(() => Math.random() - 0.5);
//     setRandomVideos(shuffledVideos);
//   };

//   const openModal = (videoUrl: string) => {
//     setCurrentVideoUrl(videoUrl);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentVideoUrl('');
//   };

//   return (
//     <div>
//       <div className={style.button}>
//         <CCTVButton
//           activeZone={activeZone}
//           setActiveZone={handleZoneChange}
//           cctvZone={cctvZone}
//         />
//       </div>
//       <div className={style.cctvContainer}>
//         {randomVideos.map((videoUrl, index) => (
//           <CCTVScreen
//             key={index}
//             activeZone={activeZone}
//             camNumber={index + 1}
//             videoUrl={videoUrl}
//             onClick={() => openModal(videoUrl)} // 클릭 핸들러 추가
//           />
//         ))}
//       </div>
//       {isModalOpen && (
//         <div className={style.modal} onClick={closeModal}>
//           <div
//             className={style.modalContent}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <video src={currentVideoUrl} controls={false} autoPlay loop muted />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import CCTVScreen from './CCTV/CCTVScreen';
import CCTVButton from './CCTVButton';
import style from './CCTVHome.module.scss';
import { useState, useEffect } from 'react';
import { OpenVidu } from 'openvidu-browser';

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
  'openvidu-stream', // 첫 번째 항목은 OpenVidu WebRTC 스트림
  '/videos/park2.mp4',
  '/videos/park.mp4',
  '/videos/playground.mp4',
];

export default function CCTVHome() {
  const [activeZone, setActiveZone] = useState<string>('101동 주변');
  const [randomVideos, setRandomVideos] = useState<string[]>(videoUrls);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');
  const [session, setSession] = useState<any>(null);
  const [mainStreamManager, setMainStreamManager] = useState<any>(null);

  const handleZoneChange = (zone: string) => {
    setActiveZone(zone);
    const shuffledVideos = [...videoUrls].sort(() => Math.random() - 0.5);
    setRandomVideos(shuffledVideos);
  };

  const openModal = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideoUrl('');
  };

  // OpenVidu 초기화 및 스트림 설정
  useEffect(() => {
    const initOpenViduSession = () => {
      const OV = new OpenVidu();
      const session = OV.initSession();

      session.on('streamCreated', (event: any) => {
        const subscriber = session.subscribe(event.stream, undefined);
        setMainStreamManager(subscriber);
      });

      fetch('/api/webrtc/gettoken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          session
            .connect(data.token)
            .then(() => {
              setSession(session);
            })
            .catch((error) => {
              console.error('Error connecting to OpenVidu:', error);
            });
        });
    };

    initOpenViduSession();

    return () => {
      if (session) session.disconnect();
    };
  }, []);

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
        {randomVideos.map((videoUrl, index) => (
          <CCTVScreen
            key={index}
            activeZone={activeZone}
            camNumber={index + 1}
            videoUrl={
              index === 0 && mainStreamManager ? mainStreamManager : videoUrl
            }
            onClick={() => openModal(videoUrl)}
          />
        ))}
      </div>
      {isModalOpen && (
        <div className={style.modal} onClick={closeModal}>
          <div
            className={style.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {currentVideoUrl === 'openvidu-stream' && mainStreamManager ? (
              <div ref={(el) => mainStreamManager.addVideoElement(el)} />
            ) : (
              <video
                src={currentVideoUrl}
                controls={false}
                autoPlay
                loop
                muted
                onContextMenu={(e) => e.preventDefault()}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
