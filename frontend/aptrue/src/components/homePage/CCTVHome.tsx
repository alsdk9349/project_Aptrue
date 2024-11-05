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
