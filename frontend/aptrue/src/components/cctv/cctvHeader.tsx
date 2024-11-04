'use client';
import Image from 'next/image';
import style from './cctv.module.scss';

export default function CCTVHeader() {
  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  const handleSearch = () => {
    console.log('검색하기');
  };
  const handleShowForm = () => {
    console.log('신청하기 버튼 클릭');
  };
  return (
    <div className={style.header}>
      <div>CCTV 처리 목록</div>
      <div className={style.search}>
        <div className={style['input-container']}>
          <input type="text" placeholder="검색" onKeyDown={handleEnter} />
          <Image
            src="/icons/searchIcon.png"
            width={16}
            height={16}
            alt="검색 버튼"
            className={style['search-icon']}
            onClick={handleSearch}
          />
        </div>
        <button onClick={handleShowForm}>신청하기</button>
      </div>
    </div>
  );
}
