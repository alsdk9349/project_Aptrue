import style from './video.module.scss';
import CCTVClip from '@/components/cctv/cctvClip';

export default async function Page(
  {
    // params,
  }: {
    // params: { clipRQId: string };
  },
) {
  // const { clipRQId } = await params;
  // [* todo] clipRQId로 clipList 가져오기

  // const clipList: ClipList = [
  //   '/videos/entrance.mp4',
  //   '/videos/park.mp4',
  //   '/videos/park2.mp4',
  //   '/videos/playground.mp4',
  //   '/videos/entrance.mp4',
  //   '/videos/park.mp4',
  //   '/videos/park2.mp4',
  //   '/videos/playground.mp4',
  //   '/videos/entrance.mp4',
  //   '/videos/park.mp4',
  //   '/videos/park2.mp4',
  //   '/videos/playground.mp4',
  // ];

  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/clip/list/${clipRQId}`,
  //   { method: 'GET', credentials: 'include' },
  // );

  // if (!response.ok) {
  //   throw new Error(`Failed to fetch data, status: ${response.status}`);
  // }

  // const result = await response.json();
  // const clipList = result.data.clipList;
  const clipList = [
    'https://aptrue-s3-bucket.s3.ap-northeast-2.amazonaws.com/request/request_3/originalVideos/original_1.mp4',
    'https://aptrue-s3-bucket.s3.ap-northeast-2.amazonaws.com/request/request_3/originalVideos/original_2.MOV',
  ];

  return (
    <div className={`${style.container}`}>
      <CCTVClip clipList={clipList} />
    </div>
  );
}
