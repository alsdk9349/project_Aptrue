"use server"

import Pagination from "@/components/common/pagination/Pagination";
import styles from './page.module.scss';
import ErrorHandler from "@/components/admin/ErrorHandler";
import AdminList from "@/components/admin/AdminList";
import { cookies } from 'next/headers';
import TableItem from "@/components/admin/TableItem";
import DefaultTableItem from "@/components/admin/DefaultTableItem";

// params값만 받아서 활용하는 서버컴포넌트!
async function fetchAdminList({
    pageNum,
}:{
    pageNum:string;
}) {

    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    console.log('getList', accessToken)
    console.log('111111')

    // api/admin/list/{page}/{limit}
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/list/${pageNum}/10`,
        {
            method: 'GET',
            credentials: 'include', // 쿠키를 포함해 서버와 통신(서버와의 인증을 위한 설정)
            // headers: {
            //     'Authorization': `Bearer ${accessToken}`, // Authorization 헤더에 accessToken 추가
            // },
            // next: {tags: ['adminList']}
            cache: 'no-store'
        }
    )

    const result = await response.json();
    console.log('status', result.status)

    if (!response.ok) {
        // const errorData = await response.json();
        console.error('Error response:', result.message);
        throw new Error(result.message || '오류가 발생했습니다.');
    }

    return result.data || [];
}


export default async function Page({params}:{params: {page:string} }) {

    const page = params.page;
    let admins: GetAdmin[] = [];
    let errorMessage = '';

    try {
        admins = await fetchAdminList({pageNum : page});
    } catch (error: any) {
        errorMessage = error.message;
    } 

    const remains: number = 10 - admins.length;

    // 관리자 목록 전체 조회 API 불러오기
    return (
        <div className={styles.container}>
            <AdminList admins={admins} remainsNum={remains} pageNum={page}/>
            <div className={styles.pagination}>
                <Pagination pageNum={page} urlPath="admin" />
            </div>
            <ErrorHandler message={errorMessage} />
        </div>
    )
}

