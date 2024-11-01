import style from '@/app/page.module.scss';
import Button from '@/components/common/button/Button';

export default function Home() {
  return (
    <>
      <Button color="white" size="webBig" clickedColor="blue">
        하이
      </Button>
      <div className={style.container}>Home</div>
    </>
  );
}
