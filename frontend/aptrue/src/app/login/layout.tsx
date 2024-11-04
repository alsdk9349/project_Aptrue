import { ReactNode } from "react";
import styles from './page.module.scss'
import LoginBackground from "@/components/login/LoginBackground";

export default function Layout({
    children
}:{
    children:ReactNode
}) {


    return (
        <div className={styles.container}>
            <LoginBackground />
            <div className={styles.ch}>
            {children}
            </div>
        </div>
    )
}