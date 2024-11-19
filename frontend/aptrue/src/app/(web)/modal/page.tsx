'use client';
import CCTVPhoto from '@/components/cctv/cctvPhoto';
import { useState } from 'react';

export default function Modal() {
  const detailInfo = {
    clipRQId: 2,
    name: 'string',
    email: 'string',
    phone: 'string',
    address: 'string',
    startDate: '2024-11-12T00:17:10.051',
    endDate: '2024-11-12T00:17:10.051',
    sections: ['string'],
    photoStatus: false,
    password: 'string',
    clipList: [],
    status: '처리 대기',
    images: ['/images/pentrue.png', '/images/cctv_ex.png'],
  };
  const [showPhotos, setShowPhtos] = useState<boolean>(false);

  const handleClosePhoto = () => {
    setShowPhtos(false);
    // console.log('닫기');
  };

  return (
    <CCTVPhoto detailInfo={detailInfo} handleClosePhoto={handleClosePhoto} />
  );
}
