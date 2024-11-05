// 'use client';

// import CCTVScreen from './CCTV/CCTVScreen';
// import CCTVButton from './CCTVButton';
// import style from './CCTVHome.module.scss';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

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
//   const router = useRouter();

//   // //[todo] 구역별 cctv 조회 api
//   // useEffect(() => {
//   //   const fetchVideo = async () => {
//   //     const response = await fetch(
//   //       `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/cctv/get/${activeZone}`,
//   //     );
//   //     if (!response.ok) {
//   //       return <div>오류가 발생했습니다...</div>;
//   //     }
//   //     const data = await response.json();
//   //     const videoUrls = data.data.map(
//   //       (item: { camId: number; cctvUrl: string }) => item.cctvUrl,
//   //     );
//   //     setRandomVideos(videoUrls);
//   //   };

//   //   fetchVideo();
//   // }, [activeZone]);

//   // const handleZoneChange = (zone: string) => {
//   //   // setActiveZone(zone);
//   //   // const shuffledVideos = [...videoUrls].sort(() => Math.random() - 0.5);
//   //   // setRandomVideos(shuffledVideos);
//   //   router.push(`/${zone}`)
//   // };

//   // const openModal = (videoUrl: string) => {
//   //   setCurrentVideoUrl(videoUrl);
//   //   setIsModalOpen(true);
//   // };

//   // const closeModal = () => {
//   //   setIsModalOpen(false);
//   //   setCurrentVideoUrl('');
//   // };

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
//             // onClick={() => openModal(videoUrl)}
//           />
//         ))}
//       </div>
//       {/* {isModalOpen && (
//         <div className={style.modal} onClick={closeModal}>
//           <div
//             className={style.modalContent}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <video src={currentVideoUrl} controls={false} autoPlay loop muted />
//           </div>
//         </div>
//       )} */}
//     </div>
//   );
// }

// 서버 컴포넌트
import CCTVButton from './CCTVButton';
import CCTVScreen from './CCTV/CCTVScreen';
import style from './CCTVHome.module.scss';

interface CCTVHomeProps {
  activeZone: string;
  videoUrls: string[];
}

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

export default function CCTVHome({ activeZone, videoUrls }: CCTVHomeProps) {
  return (
    <div>
      <div className={style.button}>
        <CCTVButton activeZone={activeZone} cctvZone={cctvZone} />
      </div>
      <div className={style.cctvContainer}>
        {videoUrls.map((videoUrl, index) => (
          <CCTVScreen
            key={index}
            activeZone={activeZone}
            camNumber={index + 1}
            videoUrl={videoUrl}
          />
        ))}
      </div>
    </div>
  );
}
