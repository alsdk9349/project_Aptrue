import { ReactNode, Suspense } from "react";
import TableColumn from "@/components/admin/TableColumn";
import TableInput from "@/components/admin/TableInput";
import styles from './layout.module.scss';
import PenTrue from '@/components/common/loadingSpinner/penTrue';
import TableItem from "@/components/admin/TableItem";

// 맨 밖의 레이아웃으로 Suspense안에는 나중에 클라이언트와 상호작용하는 tableinput만 넣어주기

export default function Layout({
    children
} : {
    children: ReactNode
}) {

    return (
        <div className={styles.layout}>
            <div className={styles.container}>
                <div className={styles.title}>
                    계정 생성 테이블
                </div>
                <TableColumn />
                <Suspense fallback={<PenTrue />}>
                    <TableInput />
                    <TableItem 
                    index={0}
                    adminID={0}
                    name="아"
                    account="아"
                    password="아"
                    phone="010-9999-9999"
                    createdAt="2024-11-08T04:35:07.202652"
                    />
                </Suspense>
                {children}
            </div>
        </div>
    )
}