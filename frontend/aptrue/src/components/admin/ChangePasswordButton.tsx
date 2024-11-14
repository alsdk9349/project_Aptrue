"use client";

import styles from './ChangePasswordButton.module.scss';
import { useState } from "react";
import ChangePasswordForm from "./ChangePasswordForm";

export default function ChangePasswordButton({account}:{account:string}) {

    const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
    const [openChangePasswordForm, setChangePasswordForm] = useState<boolean>(false);

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
                <div className={styles.formLayout}>
                    <ChangePasswordForm 
                    account={account}
                    onClose={onClose}
                    />
                </div>
            }
        </>
    )
}