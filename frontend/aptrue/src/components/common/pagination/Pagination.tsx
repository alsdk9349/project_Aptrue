import style from './Pagination.module.scss';

interface PageProps {
  pageProps: string;
}

const ITEMS_PER_PAGE = 10;
const BUTTONS_PER_GROUP = 10;

export default function Pagination({ pageProps }: PageProps) {
  const page = parseInt(pageProps, 10) || 1;
  // 페이지네이션 버튼 생성
  const currentGroup = Math.floor((page - 1) / BUTTONS_PER_GROUP);
  const startPage = currentGroup * BUTTONS_PER_GROUP;
  const endPage = startPage + BUTTONS_PER_GROUP - 1;
  const pageNumbers = Array.from(
    { length: BUTTONS_PER_GROUP },
    (_, i) => startPage + i,
  );
  return <div className={style.container}>페이지네이션</div>;
}
