import LoginBackground from "@/components/login/LoginBackground";
import LoginForm from "@/components/login/LoginForm";
import { Suspense } from "react";
import styles from './layout.module.scss';
import PenTrue from "@/components/common/loadingSpinner/penTrue";

export default function Layout({children}:{children:React.ReactNode;}) {

    return (
        <div className={styles.container}>
        <LoginBackground />
            <div className={styles.ch}>
                <div className={styles.title}>APTrue.</div>
                <Suspense fallback={<PenTrue/>}>
                {children}
                </Suspense>
            </div>
        </div>
    )
}