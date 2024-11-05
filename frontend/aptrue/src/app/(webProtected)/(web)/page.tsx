import style from '@/app/(webProtected)/(web)/page.module.scss';
import Notification from '@/components/homePage/Notification';
import CCTVHome from '@/components/homePage/CCTVHome';
import {auth} from '@/auth';
import { redirect } from 'next/navigation';

export default async function Home() {

  const session = await auth(); // useSession의 서버 버전
  if (!session?.user) {
    redirect('/login')
  }

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
