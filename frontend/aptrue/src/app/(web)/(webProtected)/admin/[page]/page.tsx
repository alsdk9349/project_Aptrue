// "use server"
"use client" // TO DO
import Cookies from 'js-cookie'; // TO DO

import Pagination from "@/components/common/pagination/Pagination";
import styles from './page.module.scss';
// import { cookies } from 'next/headers';
// import { Suspense } from "react";
import ErrorHandler from "@/components/admin/ErrorHandler";
import AdminList from "@/components/admin/AdminList";

// params값만 받아서 활용하는 서버컴포넌트!

async function fetchAdminList({
    pageNum,
    accessToken
}:{
    pageNum:string;
    accessToken:string;
}) {

    // api/admin/list/{page}/{limit}
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/list/${pageNum}/10`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            credentials: 'include', // 쿠키를 포함해 서버와 통신(서버와의 인증을 위한 설정)
            // next: {tags: ['adminList']}
            cache: 'no-store'
        }
    )

    const result = await response.json();

    if (!response.ok) {
        // const errorData = await response.json();
        console.error('Error response:', result.message);
        throw new Error(result.message || '오류가 발생했습니다.');
    }

    return result.data || [];
}

export default async function Page({params}:{params: {page:string} }) {

    const accessToken = Cookies.get('accessToken'); // TO DO

    const page = params.page;
    // const cookiesObj = cookies();
    // const accessToken = cookiesObj.get('accessToken')?.value || '';
    let admins: GetAdmin[] = [];
    let errorMessage = '';

    try {
        // TO DO
        if (accessToken) {
            admins = await fetchAdminList({pageNum : page, accessToken});
        }
    } catch (error: any) {
        errorMessage = error.message;
    }

    const remains: number = 10 - admins.length;

    // 관리자 목록 전체 조회 API 불러오기

    return (
        <>
            <AdminList admins={admins} remainsNum={remains} pageNum={page}/>
            <div className={styles.pagination}>
                <Pagination pageNum={page} urlPath="admin" />
            </div>
            <ErrorHandler message={errorMessage} />
        </>
    )
}