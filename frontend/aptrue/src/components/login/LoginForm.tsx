"use client"

import { useState } from 'react';
import styles from './LoginForm.module.scss';
import { postLogin } from '@/types/admin';
// import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

// import { signIn } from '@/auth'; // 서버 환경에서는 이거 써야함!
import { signIn } from 'next-auth/react'; // 클라이언트 환경에서는 이걸 써야함

export default function LoginForm() {

    const router = useRouter();

    const [message, setMessage] = useState<string>("")
    const [ info, setInfo ] = useState<postLogin>({
        account:"",
        password:""
    })

    const changeInfo = (event:React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = event.target;
        setInfo((prevInfo) => (
            {
                ...prevInfo,
                [name]:value,
            }
        ))
    }


    const submit = async () => {

        console.log('로그인 api 요청')

        if (! info.account) {
            setMessage('아이디를 입력해주세요')
            return
        }

        if (! info.password) {
            setMessage('비밀번호를 입력해주세요')
            return
        }

        // "credentails" : 로컬 로그인 이므로
        try { 
            await signIn("credentials", {
            account: info.account, // username,password은 next-auth의 고정이라서
            password: info.password,
            redirect: false
        }) 

        router.replace('/');

        } catch (err) {
            console.error(err)
            setMessage('아이디와 비밀번호가 일치하지 않습니다')
        }

    }

    return (
        <div className={styles.container}>
            <div className={styles.label}>아이디</div>
            <input 
            name='account'
            type="text"
            value={info.account}
            onChange={changeInfo}
            placeholder='아이디를 입력하세요'
            />

            <div className={styles.label}>비밀 번호</div>
            <input 
            name='password'
            type="password"
            value={info.password}
            onChange={changeInfo}
            placeholder='비밀번호를 입력하세요'
            />
            <button onClick={submit}>
                로그인
            </button>

            <div>
                {message}
            </div>
        </div>

    )
}