import style from './CCTVScreen.module.scss';
import CCTVWebRTC from './CCTVWebRTC';

export default function CCTVScreen({
  activeZone,
  camNumber,
  videoUrl,
  onClick,
}: {
  activeZone: string;
  camNumber: number;
  videoUrl: string;
  onClick: () => void;
}) {
  return (
    <div className={style.container} onClick={onClick}>
      <div className={style.title}>{`${activeZone} cam0${camNumber}`}</div>
      {videoUrl === 'openvidu-stream' ? (
        <div className={style.video}>
          <CCTVWebRTC />
        </div>
      ) : (
        <video
          className={style.video}
          src={videoUrl}
          autoPlay
          loop
          muted
          controls={false}
          onContextMenu={(e) => e.preventDefault()}
        />
      )}
    </div>
  );
}
