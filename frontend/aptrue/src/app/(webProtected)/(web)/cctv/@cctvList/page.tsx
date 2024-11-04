import CCTVHeader from '@/components/cctv/cctvHeader';
import style from './cctvList.module.scss';
import CCTVList from '@/components/cctv/cctvList';
import Pagination from '@/components/common/pagination/Pagination';

export default function Page() {
  return (
    <div className={style['cctv-list-container']}>
      <CCTVHeader />
      <CCTVList />
      <div className={style['cctv-list-pagination']}>
        <Pagination pageProps={'1'} />
      </div>
    </div>
  );
}
