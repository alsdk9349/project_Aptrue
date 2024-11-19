'use client';

import { useState } from 'react';
import styles from './PasswordInput.module.scss';
import { useRouter } from 'next/navigation';

export default function PasswordInput({clipRQId}:{clipRQId:string}) {

  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [ inputType, setInputType] = useState<string>('password');
  const router = useRouter();

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    // console.log(event.target.value);
  };

  const onSubmit = async () => {
    // console.log('제출 폼')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/clip/upload/${clipRQId}/link?clipRQId=${clipRQId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: password 
        }),
        credentials: 'include' // 쿠키를 포함해 서버와 통신(서버와의 인증을 위한 설정)
      });

      if (!response.ok) {
        setMessage('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        return
      }
  
      const result = await response.json();
  
      if (result.code === "P001") {
        router.push(`/resident/${clipRQId}/photo-upload`);
      } else if (result.code === "E005") {
 
        setMessage('비밀번호가 틀렸습니다. 다시 입력해주세요.')
      }

    } catch (error) {
      setMessage('예기치 않은 오류가 발생했습니다.');
      // console.error('서버 오류:', error);
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  const changeInputType = () => 
    setInputType((prev) => (prev==='password' ? 'text' : 'password'))


  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input 
        type={inputType} 
        value={password}
        onChange={changePassword} 
        onKeyDown={onKeyDown}
        />
        {inputType==='password' ? 
        <img onClick={changeInputType} src="/icons/eye-closed.png" alt="" /> 
        : 
        <img onClick={changeInputType} src="/icons/eye-opened.png" alt="" />
        }
      </div>
      <button onClick={onSubmit}>확인</button>
      <div className={styles.message}>{message}</div>
    </div>
  );
}
