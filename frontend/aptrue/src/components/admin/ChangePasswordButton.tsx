"use client";

import styles from './ChangePasswordButton.module.scss';
import { useState, useEffect } from "react";
import ChangePasswordForm from "./ChangePasswordForm";

export default function ChangePasswordButton({account}:{account:string}) {

    const [openChangePasswordForm, setChangePasswordForm] = useState<boolean>(false);

    useEffect(() => {
        // 모달이 열릴 때 body 스크롤을 막음
        if (openChangePasswordForm) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [openChangePasswordForm]);


    const changePassword = () => {
        setChangePasswordForm(true);
    }

    const onClose = () => {
        setChangePasswordForm(false);
    }

    return (
        <>
            <button 
            onClick={changePassword}
            className={styles.button}
            >
                    비밀번호 변경
            </button>
            {openChangePasswordForm &&
                    <ChangePasswordForm 
                    account={account}
                    onClose={onClose}
                    />
            }
        </>
    )
}