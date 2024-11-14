"use server"

import Pagination from "@/components/common/pagination/Pagination";
import styles from './page.module.scss';
import ErrorHandler from "@/components/admin/ErrorHandler";
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
    const refreshToken = cookieStore.get('refreshToken')?.value;
    console.log('getList-accessToken', accessToken)
    console.log('getList-refreshToken', refreshToken)

    // api/admin/list/{page}/{limit}
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/list/${pageNum}/10`,
        {
            method: 'GET',
            credentials: 'include', // 쿠키를 포함해 서버와 통신(서버와의 인증을 위한 설정)
            headers: {
                Cookie: cookies().toString()
            },
            // next: {tags: ['adminList']}
            cache: 'no-store'
        }
    )   

    const result = await response.json();
    console.log(response)

    if (!response.ok) {
        
        console.error('getList-errorResponse:', result.message);
        throw new Error(result.message || '오류가 발생했습니다.');
    }

    return result.data || [];
}


export default async function Page({params}:{params: {page:string} }) {

    const page = params.page;
    let admins: GetAdmin[] = [];
    let errorMessage = '';

    console.log("시작?");
    try {
        admins = await fetchAdminList({pageNum : page});
    } catch (error: any) {
        errorMessage = error.message;
    } 

    // 10개씩 자르는데 10개 보다 적으면 뒤에 남은 수 배열로 붙여주기
    const remainsNum: number = 10 - admins.length;
    const remains = Array.from({ length: remainsNum }, (_, i) => i + 1 + admins.length + (Number(page) - 1) * 10);


    // 관리자 목록 전체 조회 API 불러오기
    return (
        <div className={styles.container}>
            {admins.map((admin, index) => 
                <TableItem 
                key={index}
                index={(Number(page)-1)*10+index+1}
                adminID={admin.adminID}
                name={admin.name}
                account={admin.account}
                password={'*************'}
                phone={admin.phone}
                createdAt={admin.createdAt}
                />
            )}
            {remains.map((number) =>
                <DefaultTableItem 
                key={number} // 고유한 키사용
                id={number}
                />
            )}
            <div className={styles.pagination}>
                <Pagination pageNum={page} urlPath="admin" />
            </div>
            <ErrorHandler message={errorMessage} />
        </div>
    )
}

