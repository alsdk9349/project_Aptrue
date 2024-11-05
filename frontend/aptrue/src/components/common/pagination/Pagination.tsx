"use client";

import { useRouter } from 'next/navigation';
import style from './Pagination.module.scss';

interface PageProps {
  pageProps: string;
  pathName:string;
}

const ITEMS_PER_PAGE = 10;
const BUTTONS_PER_GROUP = 5;

export default function Pagination({ pageProps, pathName }: PageProps) {
  const router = useRouter();
  const page = parseInt(pageProps, 10) || 1;
  // 페이지네이션 버튼 생성
  const currentGroup = Math.floor((page - 1) / BUTTONS_PER_GROUP);
  const startPage = currentGroup * BUTTONS_PER_GROUP;
  // const endPage = startPage + BUTTONS_PER_GROUP - 1;
  const pageNumbers = Array.from(
    { length: BUTTONS_PER_GROUP },
    (_, i) => startPage + i + 1,
  );

  // 페이지 이동 함수
  const handlePageChange = (newPage: number) => {
    router.push(`/${pathName}/${newPage}`);
  };

  return (
    <div className={style.container}>
      {/* 이전 그룹 버튼 */}
      {currentGroup > 0 && (
        <button
          onClick={() => handlePageChange(startPage - BUTTONS_PER_GROUP)}
          className={style.group}
        >
          &lt; &nbsp; Back
        </button>
      )}
      {/* 페이지네이션 버튼 */}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={page === pageNumber ? style.active : ''}
        >
          {pageNumber}
        </button>
      ))}
      {/* 다음 그룹 버튼 */}
      <button
        onClick={() => handlePageChange(startPage + BUTTONS_PER_GROUP)}
        className={style.group}
      >
        Next &nbsp; &gt;
      </button>
    </div>
  );
}
