import { notFound } from 'next/navigation'; // Not found 페이지를 위한 헬퍼
import CCTVHome from '@/components/homePage/CCTVHome';
import Notification from '@/components/homePage/Notification';
import style from './page.module.scss';

interface Props {
  params: { zone: string };
}

export default async function CCTVPage({ params }: Props) {
  // const { zone } = params;

  const zone = decodeURIComponent(params.zone);

  // console.log(zone);

  const videoUrls = [
    '/videos/entrance.mp4',
    '/videos/park2.mp4',
    '/videos/park.mp4',
    '/videos/playground.mp4',
  ];
  // // 백엔드 API 호출 (서버 컴포넌트에서)
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/cctv/get/${zone}`,
  // );
  // if (!response.ok) {
  //   notFound(); // 에러가 발생하면 404 페이지로 이동
  // }

  // const data = await response.json();
  // const videoUrls = data.data.map(
  //   (item: { camId: number; cctvUrl: string }) => item.cctvUrl,
  // );

  return (
    <div className={style.page}>
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.title}>CCTV</div>
          {/* CCTVHome에 props로 videoUrls 전달 */}
          <CCTVHome activeZone={zone} videoUrls={videoUrls} />
        </div>
      </div>
      <div className={style.notification}>
        <Notification />
      </div>
    </div>
  );
}
