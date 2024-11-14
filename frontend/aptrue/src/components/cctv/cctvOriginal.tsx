import style from './cctvForm.module.scss';

export default function CCTVOriginal({
  detailInfo,
}: {
  detailInfo: requestDetailInfo;
}) {
  return (
    <div className={style['cctv-video-box']}>
      <div>관리자용 영상</div>
      <div className={style['real-blue']}>
        <a
          href={`${window.location.origin}/video/${detailInfo.clipRQId}`}
          target="_blank"
          rel="noopener noreferrer"
          className={style['real-blue']}
        >
          {`https://www.ssafy-aptrue/video/admin`}
        </a>
      </div>
    </div>
  );
}
