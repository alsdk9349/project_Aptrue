"use client"

import styles from './Table.module.scss';
import classNames from 'classnames';
import {format} from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { formatPhoneNumber, isValidPassword, isValidPhoneNumber } from '@/utils/formatters';
import ErrorModal from './ErrorModal';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
// import { createAdminAction } from '@/serverActions/create-admin.action';


export default function TableInput() {

    const accessToken = Cookies.get('accessToken');
    const {page} : {page:string}  = useParams();
    const router = useRouter();

    // 유효성 검사 errorMessage
    const [passwordErrorMessage, setpasswordErrorMessage] =useState<string>('');
    const [phoneErrorMessage, setPhoneErrorMessage] =useState<string>('');

    // 에러 메세지
    const [message, setMessage] = useState<string>('');
    const [isOpenErrorModal, setIsOpenErrorModal] = useState<boolean>(false);
    
    const [newAdmin, setNewAdmin] = useState<PostAdmin>({
        name:'',
        account:'',
        password:'',
        phone:''
    })

    // 필수 입력값이 모두 비어있지 않고 오류 메시지가 없는 경우
    const canCreate = newAdmin.name.trim() && newAdmin.account.trim() && !passwordErrorMessage && !phoneErrorMessage;

    // 비밀번호 전화번호 유효성검사
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {

        setpasswordErrorMessage('')
        setPhoneErrorMessage('')
        const {name, value} = event.target;

        if (value === '') {
            if (name === 'password') setpasswordErrorMessage('');
            if (name === 'phone') setPhoneErrorMessage('');
            
        } else {

            if (name==='password') {
                if (!isValidPassword(value)) {
                    setpasswordErrorMessage('특수문자, 알파벳, 숫자를 포함하여 8자 이상이어야 합니다')
                } else {
                    setpasswordErrorMessage('')
                }
            }

            if (name==='phone') {
                if (!isValidPhoneNumber(value)) {
                    setPhoneErrorMessage('010-0000-0000 형식이어야 합니다')
                } else {
                    setPhoneErrorMessage('')
                }
            }

        }

        setNewAdmin((prevData) => ({
            ...prevData,
            [name]: name === 'phone' ? formatPhoneNumber(value) : value
        }));

    }

    // 새로운 관리자 등록 (서버 액션)
    // const submitNewAdmin = async () => {
    //     const result = await createAdminAction({
    //         ...newAdmin, 
    //         accessToken, 
    //         page
    //     })

    //     setNewAdmin({ name: '', account: '', password: '', phone: '' }); // 인풋 초기화
    //     setMessage(result.message);
    //     setIsOpenErrorModal(true)
    // }


    const submitNewAdmin = async () => {
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${accessToken}`, // accessToken을 Authorization 헤더에 추가
                },
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
    
                setMessage(result.message);
                setIsOpenErrorModal(true);
                router.refresh(); // 페이지를 새로고침하지 않고 캐시 데이터를 새로고침
                // revalidateTag('adminList'); // adminList 캐시 태그가 붙은 모든 항목을 무효화(클라이언트 컴포넌트에서 작동하지 않음)
    
            } else if (result.code === "E003") {
                setMessage(result.message);
                setIsOpenErrorModal(true);
    
            } else {
                setMessage('관리자 등록 실패');
                setIsOpenErrorModal(true);
            }
        } catch (error) {
            setMessage('오류가 발생했습니다');
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
                { passwordErrorMessage && <div className={styles.validation}>{passwordErrorMessage}</div>}
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
                {phoneErrorMessage && <div className={styles.validation}>{phoneErrorMessage}</div>}
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
            <div className={styles.blank}><span></span></div>
            {isOpenErrorModal && 
            <ErrorModal message={message} isOpen={isOpenErrorModal} onClose={closeModal}/>
            }
        </div>
    )
}