// 'use client';

// import style from './CCTVScreen.module.scss';

// export default function CCTVScreen({
//   activeZone,
//   camNumber,
//   videoUrl,
//   onClick,
// }: {
//   activeZone: string;
//   camNumber: number;
//   videoUrl: string;
//   onClick: () => void;
// }) {
//   return (
//     <div className={style.container} onClick={onClick}>
//       <div className={style.title}>{`${activeZone} cam0${camNumber}`}</div>
//       <video
//         className={style.video}
//         src={videoUrl}
//         autoPlay
//         loop
//         muted
//         controls={false}
//       />
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import style from './CCTVScreen.module.scss';

interface CCTVScreenProps {
  activeZone: string;
  camNumber: number;
  videoUrl: string;
}

export default function CCTVScreen({
  activeZone,
  camNumber,
  videoUrl,
}: CCTVScreenProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={style.container}>
      <div className={style.title}>{`${activeZone} cam0${camNumber}`}</div>
      {/* 클릭 이벤트 추가 */}
      <video
        className={style.video}
        src={videoUrl}
        autoPlay
        loop
        muted
        controls={false}
        onClick={openModal} // 클릭 시 모달을 엽니다
      />

      {/* 모달: 동영상을 크게 표시 */}
      {isModalOpen && (
        <div className={style.modal} onClick={closeModal}>
          <div
            className={style.modalContent}
            onClick={(e) => e.stopPropagation()} // 모달 내용 클릭 시 닫히지 않도록 방지
          >
            <video src={videoUrl} controls={false} autoPlay loop muted />
          </div>
        </div>
      )}
    </div>
  );
}
