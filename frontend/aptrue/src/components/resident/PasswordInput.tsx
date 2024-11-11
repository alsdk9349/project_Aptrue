'use client';

import { useState } from 'react';
import styles from './PasswordInput.module.scss';
import { useRouter, useParams } from 'next/navigation';

export default function PasswordInput() {

  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();
  const { clipRQId } = useParams();
  console.log('clipRQId',clipRQId)

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    console.log(event.target.value);
  };

  const onSubmit = async () => {

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/clip/upload/${clipRQId}/link`, {
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
      console.error('서버 오류:', error);
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className={styles.container}>
      <input 
      type="password" 
      value={password}
      onChange={changePassword} 
      onKeyDown={onKeyDown}
      />
      <button onClick={onSubmit}>확인</button>
      <div className={styles.message}>{message}</div>
    </div>
  );
}
