// CCTVScreen.tsx
import style from './CCTVScreen.module.scss';

export default function CCTVScreen({
  activeZone,
  camNumber,
  videoUrl,
}: {
  activeZone: string;
  camNumber: number;
  videoUrl: string;
}) {
  return (
    <div className={style.container}>
      <div className={style.title}>{`${activeZone} cam0${camNumber}`}</div>
      <video
        className={style.video}
        src={videoUrl}
        autoPlay
        loop
        muted
        controls={false}
      />
    </div>
  );
}
