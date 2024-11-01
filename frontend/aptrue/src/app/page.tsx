"use client"

import style from '@/app/page.module.scss';
import GeneralInput from '@/components/common/input/GeneralInput';
import TimeInput from '@/components/common/input/TimeInput';
import LoginInput from '@/components/common/input/LoginInput';

export default function Home() {

  const changeName = (name:string) => {
    console.log(name)
  }

  const changeEmail = (email:string) =>  {
    console.log(email)
  }

  const handleTime = (time:string) => {
    console.log(time)
  }

  const handleId = (id:string) => {
    console.log(id)
  }

  return (
    <>
    <div className={style.container}>Home</div>
    <GeneralInput label="이름" placeholder='홍길동' size='short' onChange={changeName}/>
    <GeneralInput label="이메일" placeholder='apple12345@gamil.com' size="long" onChange={changeEmail}/> 
    <TimeInput onChange={handleTime} isWeb={true} />
    <TimeInput onChange={handleTime} isWeb={false} />
    <LoginInput label='아이디' onChange={handleId} placeholder='아이디를 입력하세요'/>
    </>
  );
}




