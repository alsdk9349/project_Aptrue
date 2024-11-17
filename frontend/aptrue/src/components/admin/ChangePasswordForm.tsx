"use client"

import styles from './ChangePasswordForm.module.scss';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isValidPassword } from '@/utils/formatters';
import ErrorModal from './ErrorModal';
import Cookies from 'js-cookie';
import ReactDOM from 'react-dom';


export default function ChangePasswordForm({
    adminID,
    account,
    onClose
}:{
    adminID:number;
    account:string;
    onClose:()=>void
}) {

    const [password, setPassword] = useState<string>('');
    const [repassword, setRepassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [remessage, setRemessage]=useState<string>('');
    const router = useRouter();

    const accessToken = Cookies.get('accessToken');

    const [resultMessage, setResultMessage] = useState<string>('');
    const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);

    const changePassword = (event:ChangeEvent<HTMLInputElement>) => {

        const value = event.target.value.trimStart(); // 입력의 시작 부분에 있는 공백 제거
        setPassword(value)

        if (value && !isValidPassword(value)) {
            setMessage('특수문자, 알파벳, 숫자를 포함하여 8자 이상이어야 합니다')
        } else {
            setMessage('')
        }
    }

    const changeRepassword = (event:ChangeEvent<HTMLInputElement>) => {
        
        const value = event.target.value.trimStart(); // 입력의 시작 부분에 있는 공백 제거
        setRepassword(value)

        if (value && value !== password) {
            setRemessage('비밀번호가 동일하지 않습니다');
        } else {
            setRemessage('');
        }
    }

    const submitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 폼이 제출될 때 페이지가 새로고침되는 것을 방지하기위해 사용

        // 비어있다는걸 알리는 메세지가 있다면
        if (message && remessage) {
            return
        }
        
        if (!password.trim() && !repassword.trim()) {
            setMessage('비밀번호를 입력해주세요')
            return
        }

        console.log('process.env.NEXT_PUBLIC_BASE_URL', process.env.NEXT_PUBLIC_BASE_URL)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/change/password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                adminId: adminID,
                password: password 
            }),
            credentials: 'include' // 쿠키를 포함해 서버와 통신(서버와의 인증을 위한 설정)
        });

        const result = await response.json();

        if (result.status === 200) {

            console.log('비밀번호 변경 성공')
            router.refresh();
            setResultMessage(result.message)
            onClose();

        } else {

            console.log('비밀번호 변경 실패', result.message)
        }
    };

    const handleErrorModal = () => {
        setOpenErrorModal(!openErrorModal)
    }

    return ReactDOM.createPortal(
        <div className={styles.layout}>
            <form onSubmit={submitPassword} className={styles.container}>
                <div className={styles.title}>비밀번호 변경</div>
                <input
                    type="text"
                    placeholder="아이디"
                    value={account}
                    readOnly
                />
                <input
                    type="password"
                    placeholder="새 비밀번호 입력"
                    value={password}
                    onChange={changePassword}
                    // required
                />
                {message && 
                <div className={styles.error}>
                    {message}
                </div>
                }
                <input
                    type="password"
                    placeholder="새 비밀번호 확인"
                    value={repassword}
                    onChange={changeRepassword}
                    // required
                />
                {remessage && 
                <div className={styles.error}>
                    {remessage}
                </div>
                }
                <div className={styles.buttonContainer}>
                    <button type="button" className={styles.closeButton} onClick={onClose}>닫기</button>
                    <button type="submit" className={styles.changeButton}>저장</button>
                </div>
                {message && openErrorModal && <ErrorModal message={resultMessage} onClose={handleErrorModal} isOpen={!!message} />}
            </form>
        </div>,
        document.body
    )
}