'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // App Router용 훅
import style from './WebNav.module.scss';
import ApartCard from './ApartCard';
import { adminState } from '@/state/atoms/admins';
import { useResetRecoilState } from 'recoil';

export default function WebNav() {
  const resetAdminState = useResetRecoilState(adminState);

  const pathname = usePathname(); // 현재 경로 가져오기
  const router = useRouter();

  // 현재 경로를 기반으로 activeItem 설정
  const getActiveItem = () => {
    if (pathname === '/') return 'home';
    if (pathname.includes('/cctv')) return 'cctv';
    if (pathname.includes('/admin')) return 'admin';
    return '';
  };

  const activeItem = getActiveItem();

  const handleLogout = async () => {
    try {

      const cookies = document.cookie; // 현재 쿠키 가져오기

      // 로그아웃 API 호출로 쿠키 제거
      const response = await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
            Cookie: cookies, // 쿠키를 명시적으로 추가
          },
          credentials: 'include', // 쿠키 포함 설정
      });

      console.log('응답 상태 코드:', response.status); // 상태 코드 확인
      console.log('응답 데이터:', await response.json());

      if (response.ok) {

        console.log('로그아웃 성공');
        resetAdminState(); // 로컬스토리지 비우기
        localStorage.removeItem('recoil-persist'); // persist된 데이터 삭제

        router.push('/login'); // 로그인 페이지로 이동
      } else {
          console.log('로그아웃 실패');
      }

    } catch (error) {
      console.log('로그아웃 에러', error);
    }
  };

  return (
    <div className={style.navbar}>
      <div className={style.container}>
        <div className={style.title} onClick={() => router.push('/')}>
          APTrue.
        </div>
        <div className={style.card}>
          <ApartCard />
        </div>
        <div className={style.select}>
          <Link
            href="/"
            className={`${style.home} ${style.commonItem} ${
              activeItem === 'home' ? style.active : ''
            }`}
          >
            <div className={style.iconWrapper}>
              <img
                src={
                  activeItem === 'home'
                    ? '/icons/home_white.png'
                    : '/icons/home_black.png'
                }
                alt="Home Icon"
                className={style.icon}
              />
            </div>
            <span className={style.text}>관리자 홈</span>
          </Link>

          <Link
            href="/cctv"
            className={`${style.cctv} ${style.commonItem} ${
              activeItem === 'cctv' ? style.active : ''
            }`}
          >
            <div className={style.iconWrapper}>
              <img
                src={
                  activeItem === 'cctv'
                    ? '/icons/cctv_white.png'
                    : '/icons/cctv_black.png'
                }
                alt="CCTV Icon"
                className={style.icon}
              />
            </div>
            <span className={style.text}>CCTV 처리</span>
          </Link>

          <Link
            href="/admin/1"
            className={`${style.account} ${style.commonItem} ${
              activeItem === 'admin' ? style.active : ''
            }`}
          >
            <div className={style.iconWrapper}>
              <img
                src={
                  activeItem === 'admin'
                    ? '/icons/manager_white.png'
                    : '/icons/manager_black.png'
                }
                alt="Account Icon"
                className={style.icon}
              />
            </div>
            <span className={style.text}>관리자 계정</span>
          </Link>
        </div>
        <div className={style.logout} onClick={handleLogout}>
          <div className={style.iconWrapper}>
            <img src="/icons/logout.png" alt="" className={style.icon} />
          </div>
          <span className={style.logoutText}>로그아웃</span>
        </div>
      </div>
    </div>
  );
}
