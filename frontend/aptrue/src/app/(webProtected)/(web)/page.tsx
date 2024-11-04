import style from '@/app/(webProtected)/(web)/page.module.scss';
import CCTVButton from '@/components/homePage/CCTVButton';
import Notification from '@/components/homePage/Notification';

export default function Home() {
  return (
    <div className={style.page}>
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.title}>CCTV</div>
          <div className={style.button}>
            <CCTVButton />
          </div>
        </div>
      </div>
      <div className={style.notification}>
        <Notification />
      </div>
    </div>
  );
}
