import LoginForm from "@/components/login/LoginForm";
import { Suspense } from "react";
import styles from './page.module.scss';

export default function Page() {

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
            </Suspense>
        </>
    )
}