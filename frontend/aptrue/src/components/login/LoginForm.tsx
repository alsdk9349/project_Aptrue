"use client";

import styles from './LoginForm.module.scss';
import { postLogin } from '@/types/admin';
import Button from '../common/button/Button';

export default function LoginForm() {

    const [ info, setInfo ] = useState<postLogin>({
        account:"",
        password:""
    })

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
                username: account,
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
            type="text"
            value={info.password}
            onChange={changeInfo}
            placeholder='비밀번호를 입력하세요'
            />
            <button disabled={!account || !password}>
                로그인
            </button>
        </div>

    )
}