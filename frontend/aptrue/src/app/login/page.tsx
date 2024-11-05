import LoginBackground from "@/components/login/LoginBackground";
import LoginForm from "@/components/login/LoginForm";
import { postLogin } from "@/types/admin";
import { signIn } from "next-auth/react";
import { Suspense } from "react";
import styles from './page.module.scss';

export default function Page() {

    return (
        <div className={styles.container}>
            <LoginBackground />
            <div className={styles.ch}>
                <div className={styles.title}>APTrue.</div>
                <Suspense fallback={<div>Loading...</div>}>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    )
}