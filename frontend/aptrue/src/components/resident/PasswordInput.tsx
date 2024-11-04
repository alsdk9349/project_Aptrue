"use client"
import { useState } from 'react'
import styles from './PasswordInput.module.scss'
import { useRouter } from 'next/navigation';

export default function PasswordInput() {

    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    const changePassword = (event:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const onSubmit = () => {
        if (!password) {
            // API 연결할 부분 비밀번호 맞는지 확인하고 성공이면!!!
            router.push(`/${1}/`)
        }
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    }

    return (
        <div className={styles.container}>
            <input 
            type="text" 
            onChange={changePassword}
            onKeyDown={onKeyDown}
            />
            <button
            onClick={onSubmit}
            >확인</button>
        </div>
    )
}