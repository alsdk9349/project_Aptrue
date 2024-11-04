import style from './cctv.module.scss';

interface CCTVListItemProps {
  item?: CCTVItem;
  num: number;
}

export default function CCTVListItem({ item, num }: CCTVListItemProps) {
  const getStatusClass = (status: string) => {
    switch (status) {
      case '방문 필요':
        return style.red;
      case '민원 완료':
        return style.blue;
      case '처리 대기':
        return style.orange;
    }
  };

  return (
    <div className={style['item-container']}>
      <div className={style.numbox}>{num}</div>
      <div className={style.content}>
        {item && (
          <>
            <div className={style.description}>
              <div
                className={`${getStatusClass(item.status)}`}
              >{`• \u00A0 ${item.status}`}</div>
              <div>{`${item.address} ${item.name}님의 CCTV 처리 요청`}</div>
            </div>
            <div>{new Date(item.createdAt).toLocaleString()}</div>
          </>
        )}
      </div>
    </div>
  );
}
