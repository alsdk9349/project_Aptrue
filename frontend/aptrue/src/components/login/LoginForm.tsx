"use client";

import styles from './LoginForm.module.scss';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useState } from 'react';

// import { signIn } from '@/auth'; // 서버 환경에서는 이거 써야함!
import { signIn } from 'next-auth/react'; // 클라이언트 환경에서는 이걸 써야함


export default function LoginForm() {

    const router = useRouter();

    const [message, setMessage] = useState<string>("")
    const [account, setAccount] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const changeAccount = (event:React.ChangeEvent<HTMLInputElement>) => {
        setAccount(event.target.value)
    }

    const changePassword = (event:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }


    const onSubmit : FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setMessage('')

        try {
            const result = await signIn("credentials", {
                account: account,
                password: password,
                redirect:false
            })
            console.log('here1', result)

            if (result?.error) {
                setMessage('아이디와 비밀번호가 일치하지 않습니다');
                console.log('here2')
              } else {
                router.replace('/');
              }
        } catch (error) {
            console.error(error);
            setMessage('로그인에 실패했습니다. 다시 시도해주세요')
        }

        
    }

    return (
        <form onSubmit={onSubmit} className={styles.container}>
            <div className={styles.label}>아이디</div>
            <input 
            name='account'
            type="text"
            value={account}
            onChange={changeAccount}
            placeholder='아이디를 입력하세요'
            />

            <div className={styles.label}>비밀 번호</div>
            <input 
            name='password'
            type='text'
            // TO DO
            // type="password"
            value={password}
            onChange={changePassword}
            placeholder='비밀번호를 입력하세요'
            />
            <button type='submit' disabled={!account || !password}>
                로그인
            </button>

            <div className={styles.error}>
                {message}
            </div>
        </form>

    )
}