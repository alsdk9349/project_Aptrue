'use client';
import { useState } from 'react';
import style from './cctvPhto.module.scss';
import Image from 'next/image';

export default function CCTVPhoto({
  detailInfo,
  handleClosePhoto,
}: {
  detailInfo: requestDetailInfo;
  handleClosePhoto: () => void;
}) {
  const images = detailInfo.images;
  const [selectedImage, setSelectedImage] = useState<string>('');

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage('');
  };

  return (
    <div className={style.modal}>
      <div className={style.container}>
        <div className={style.xbutton}>
          <img src="/icons/xbutton.png" onClick={handleClosePhoto} />
        </div>
        <div className={style.title}>업로드된 사진</div>
        <div className={style.content}>
          CCTV AI 영상 처리를 위해 {detailInfo.address}의 {detailInfo.name}님이
          업로드한 사진입니다.
        </div>
        <div className={style.photos}>
          {images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              onClick={() => handleImageClick(image)}
            >
              <Image
                className={style.image}
                src={image}
                width={100}
                height={100}
                alt="업로드된 사진"
              />
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className={style.overlay} onClick={closeModal}>
          <div className={style.largePhoto}>
            <Image
              src={selectedImage}
              width={350}
              height={350}
              alt="확대된 사진"
            />
          </div>
        </div>
      )}
    </div>
  );
}
