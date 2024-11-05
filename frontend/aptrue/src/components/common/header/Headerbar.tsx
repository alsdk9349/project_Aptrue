'use client';

import { useEffect } from 'react';
import styles from './Headerbar.module.scss';
import { usePathname } from 'next/navigation';

export default function Headerbar({ name }: { name: string }) {
  const pathname = usePathname();

  useEffect(() => {}, [pathname]);

    return (
        <div className={styles.container}>
            <div>
                {pathname==='/' && '관리자 홈'}
                {pathname.includes('/cctv') && 'CCTV 처리'}
                {pathname.includes('/admin') && '관리자 계정 '}
            </div>
            <div className={styles.profile}>
                <img src="/icons/profileImage.png" alt="" />
                <div>관리자 {name}</div>
            </div>
        </div>
    )
}
