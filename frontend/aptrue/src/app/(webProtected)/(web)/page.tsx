import style from '@/app/(webProtected)/(web)/page.module.scss';
import Notification from '@/components/homePage/Notification';
import CCTVHome from '@/components/homePage/CCTVHome';

export default function Home() {
  return (
    <div className={style.page}>
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.title}>CCTV</div>
          <CCTVHome />
        </div>
      </div>
      <div className={style.notification}>
        <Notification />
      </div>
    </div>
  );
}