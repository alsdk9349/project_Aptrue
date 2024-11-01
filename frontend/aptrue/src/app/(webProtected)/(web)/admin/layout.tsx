import { ReactNode, Suspense } from "react"
import TableColumn from "@/components/admin/TableColumn";
import styles from './page.module.scss';
import TableInput from "@/components/admin/TableInput";

export default function Layout({
    children
} : {
    children: ReactNode
}) {

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                계정 생성 테이블
            </div>
            <TableColumn />
            <Suspense>
                <TableInput />
            </Suspense>
            {children}
        </div>
    )
}