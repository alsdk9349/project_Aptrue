import style from './AlertModal.module.scss';

interface AlertProps {
  category: string;
  imgUrl: string;
  activeZone: string;
  onClick: () => void;
}

export default function AlertModal({
  category,
  imgUrl,
  activeZone,
  onClick,
}: AlertProps) {
  return (
    <div className={style.modalBackdrop} onClick={onClick}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={style.title}>
          <img src="/icons/fire_icon.png" alt="" />
          <p>{category} 감지</p>
        </div>
        <img src={imgUrl} alt="alertImg" />
        <div className={style.content}>
          {activeZone}에서 {category}가 감지되었습니다
        </div>
        <img
          src="/icons/xbutton.png"
          alt="닫기 버튼"
          onClick={onClick}
          className={style.xbutton}
        />
      </div>
    </div>
  );
}
