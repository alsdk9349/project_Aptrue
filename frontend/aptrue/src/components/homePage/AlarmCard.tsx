import style from './AlarmCard.module.scss';

export default function AlarmCard({
  notificationId,
  message,
  category,
  emergency,
  isCompleted,
  date,
  image,
}: Alarm) {
  const categoryClass =
    category === '화재'
      ? style.fire
      : category === '불법주차'
        ? style.parking
        : category === 'cctv 요청 처리'
          ? style.request
          : '';

  return (
    <div className={`${style.container} ${categoryClass}`}>
      <div className={`${style.textContainer} ${!image ? style.full : ''}`}>
        <div className={style.message}>{message}</div>
        <p className={style.date}>{new Date(date).toLocaleString()}</p>
        <p
          className={`${style.status} ${isCompleted ? style.completed : style.incomplete}`}
        >
          ⦁ {isCompleted ? '완료' : '미완료'}
        </p>
      </div>
      {image && (
        <div className={style.imageContainer}>
          <img src={image} alt="이미지" />
        </div>
      )}
    </div>
  );
}
