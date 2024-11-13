import Image from 'next/image';
import style from './penTrue.module.scss';

export default function PenTrue() {
  const pentrue = '/images/pentrue.png';
  return (
    <div className={style.pentrue}>
      <Image src={pentrue} height={200} width={200} alt="pentrue" />
    </div>
  );
}
