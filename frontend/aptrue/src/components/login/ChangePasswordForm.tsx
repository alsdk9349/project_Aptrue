"use client"

import styles from './LoginForm.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ChangePasswordForm() {

    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 폼이 제출될 때 페이지가 새로고침되는 것을 방지하기 위해 사용

        const formData = new FormData(e.currentTarget)
        // const account = (formData.get('account') as string)?.trim() || '';
        // const password = (formData.get('password') as string)?.trim() || '';

        if (!account.trim() && !password.trim()) {
            setMessage('아이디와 비밀번호를 입력해주세요')
            return
        } else if (!account || !account.trim()) {
            setMessage('아이디를 입력해주세요')
            return
        } else if (!password || !password.trim()) {
            setMessage('비밀번호를 입력해주세요')
            return
        }

        console.log('process.env.NEXT_PUBLIC_BASE_URL', process.env.NEXT_PUBLIC_BASE_URL)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                account: account,
                password: password 
            }),
            credentials: 'include' // 쿠키를 포함해 서버와 통신(서버와의 인증을 위한 설정)
        });

        const result = await response.json();
        const resultAdmin : ResultAdmin  = result.data;


        if (result.status === 200) {
            // 로그인 성공 시 관리자 페이지로 이동
            console.log('로그인 성공')
            router.push('/');
        } else {
            // alert(result.message); // 실패 메시지 표시
            console.log('로그인 실패', result.message)
        }
    };

    return (
        <form onSubmit={changePassword} className={styles.container}>
        <input
            type="text"
            placeholder="아이디"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            // required
        />
        <input
            type="password"
            placeholder="새 비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
        />
                <input
            type="password"
            placeholder="새 비밀번호 확인"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
        />
        <button type="submit">비밀번호 변경</button>
        <Link href={'/login'} className={styles.password}>돌아가기</Link>

        <div className={styles.error}>
            {message}
        </div>
    </form>
    )
}