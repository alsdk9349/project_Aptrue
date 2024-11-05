"use client"

import { useState } from 'react';
import styles from './LoginForm.module.scss';
import { postLogin } from '@/types/admin';
import Button from '../common/button/Button';

export default function LoginForm() {

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

    const submit = () => {
        console.log('로그인 api 요청')
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
            type="text"
            value={info.password}
            onChange={changeInfo}
            placeholder='비밀번호를 입력하세요'
            />
            <button onClick={submit}>
                로그인
            </button>
        </div>

    )
}