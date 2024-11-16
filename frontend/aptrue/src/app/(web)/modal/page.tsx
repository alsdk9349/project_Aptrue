import CCTVPhoto from '@/components/cctv/cctvPhoto';

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

  return <CCTVPhoto detailInfo={detailInfo} />;
}
