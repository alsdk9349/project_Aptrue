"use client"

import styles from './Table.module.scss';
import classNames from 'classnames';
import {format} from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import { formatPhoneNumber, isValidPassword, isValidPhoneNumber } from '@/utils/formatters';
// import { revalidateTag } from 'next/cache';
import ErrorModal from './ErrorModal';


export default function TableInput() {

    // 유효성 검사 errorMessage
    const [passwordMessage, setPasswordMessage] =useState<string>('');
    const [phoneMessage, setPhoneMessage] =useState<string>('');

    // 에러 메세지
    const [message, setMessage] = useState<string>('');
    const [isOpenErrorModal, setIsOpenErrorModal] = useState<boolean>(false);
    
    const [newAdmin, setNewAdmin] = useState<PostAdmin>({
        name:'',
        account:'',
        password:'',
        phone:''
    })

    const canCreate = newAdmin.name.trim() && newAdmin.account.trim() && !passwordMessage && !phoneMessage;

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {

        setPasswordMessage('')
        setPhoneMessage('')
        const {name, value} = event.target;

        if (name==='password') {
            if (!isValidPassword(value)) {
                setPasswordMessage('특수문자, 알파벳, 숫자를 포함하여 8자 이상이어야 합니다')
            } else {
                setPasswordMessage('')
            }
        }

        if (name==='phone') {
            if (!isValidPhoneNumber(value)) {
                setPhoneMessage('010-0000-0000 형식이어야 합니다')
            } else {
                setPhoneMessage('')
            }
        }

        setNewAdmin((prevData) => ({
            ...prevData,
            [name]: name === 'phone' ? formatPhoneNumber(value) : value
        }));

    }


    const submitNewAdmin = async () => {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signup`, {
            method: 'POST',
            body: JSON.stringify(newAdmin),
            credentials: 'include' // 쿠키를 포함해 서버와 통신(서버와의 인증을 위한 설정)
        });

        const result = await response.json();

        if (result.status === 200 && result.code==="A005") {

            // 입력 필드 초기화
            setNewAdmin({
                name: '',
                account: '',
                password: '',
                phone: ''
            });

            setMessage(result.message)
            setIsOpenErrorModal(true);
            console.log(result.message) //  "새로운 관리자를 등록했습니다."
            // revalidateTag('adminList'); // adminList 캐시 태그가 붙은 모든 항목을 무효화(클라이언트 컴포넌트에서 작동하지 않음)

        } else if (result.code === "E003") {
            setMessage(result.message)
            setIsOpenErrorModal(true);
            console.log('이미 등록된 관리자')

        } else {
            setMessage('관리자 등록 실패')
            setIsOpenErrorModal(true);
        }
    }

    const closeModal = () => {
        setIsOpenErrorModal(false);
        setMessage('')
    }

    return (
        <div className={ classNames(
            styles.container, styles.isTableInput
            )}>
            <div className={styles.no}>
                <img src="/icons/plusIcon.png" alt="" />
            </div>
            <div className={styles.name}>
                <input 
                type="text" 
                name="name"
                value={newAdmin.name}
                placeholder='이름' 
                onChange={handleChange}
                required
                />
            </div>
            <div className={styles.id}>
                <input 
                type="text" 
                name="account"
                value={newAdmin.account}
                placeholder='아이디' 
                onChange={handleChange}
                required
                />
            </div>
            <div className={styles.password}>
                <input 
                type="password" 
                name="password"
                value={newAdmin.password}
                placeholder='비밀번호' 
                onChange={handleChange}
                required
                />
                <div className={styles.validation}>{passwordMessage}</div>
            </div>
            <div className={styles.phoneNumber}>
                <input 
                type="text" 
                name="phone"
                value={newAdmin.phone}
                placeholder='전화번호' 
                onChange={handleChange}
                required
                />
                <div className={styles.validation}>{phoneMessage}</div>
            </div>
            <div className={styles.date}>
                <input 
                type="text" 
                placeholder='등록일' 
                value={format( new Date(), "yyyy-MM-dd", {locale:ko})}
                readOnly
                />
            </div>
            <div className={classNames(styles.blank, styles.buttonContainer)}>
                <button 
                onClick={submitNewAdmin} 
                className={canCreate ? styles.blue : styles.gray}
                disabled={!canCreate}
                >
                    등록
                </button>
            </div>
            {isOpenErrorModal && 
            <ErrorModal message={message} isOpen={isOpenErrorModal} onClose={closeModal}/>
            }
        </div>
    )
}