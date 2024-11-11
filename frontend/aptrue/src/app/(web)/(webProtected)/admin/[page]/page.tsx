// "use server"
// // "use client" // use client
// // import Cookies from 'js-cookie'; // use client
// // import { useEffect, useState } from 'react'; // use client
// // import axios from 'axios'; // use client

// import Pagination from "@/components/common/pagination/Pagination";
// import styles from './page.module.scss';
// import { cookies } from 'next/headers';
// import ErrorHandler from "@/components/admin/ErrorHandler";
// import AdminList from "@/components/admin/AdminList";

// // params값만 받아서 활용하는 서버컴포넌트!

// async function fetchAdminList({
//     pageNum,
//     accessToken
// }:{
//     pageNum:string;
//     accessToken:string;
// }) {

//     // api/admin/list/{page}/{limit}
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/list/${pageNum}/10`,
//         {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//             },
//             credentials: 'include', // 쿠키를 포함해 서버와 통신(서버와의 인증을 위한 설정)
//             // next: {tags: ['adminList']}
//             cache: 'no-store'
//         }
//     )

//     const result = await response.json();

//     if (!response.ok) {
//         // const errorData = await response.json();
//         console.error('Error response:', result.message);
//         throw new Error(result.message || '오류가 발생했습니다.');
//     }

//     return result.data || [];
// }

// export default async function Page({params}:{params: {page:string} }) {

//     // const accessToken = Cookies.get('accessToken'); // use client

//     const page = params.page;
//     const cookiesObj = cookies();
//     const accessToken = cookiesObj.get('accessToken')?.value || '';
//     let admins: GetAdmin[] = [];
//     let errorMessage = '';

//     try {
//         // use client
//         // if (accessToken) {
//             admins = await fetchAdminList({pageNum : page, accessToken});
//         // }
//     } catch (error: any) {
//         errorMessage = error.message;
//     }

//     const remains: number = 10 - admins.length;

//     // 관리자 목록 전체 조회 API 불러오기

//     return (
//         <>
//             <AdminList admins={admins} remainsNum={remains} pageNum={page}/>
//             <div className={styles.pagination}>
//                 <Pagination pageNum={page} urlPath="admin" />
//             </div>
//             <ErrorHandler message={errorMessage} />
//         </>
//     )
// }

// ---------------------------------------

// "use server" (기본적으로 서버 컴포넌트)
// "use client"는 클라이언트 컴포넌트에만 사용

import axios from 'axios'; // 서버 사이드에서도 사용할 수 있습니다.
import Pagination from '@/components/common/pagination/Pagination';
import styles from './page.module.scss';
import { cookies } from 'next/headers';
import ErrorHandler from '@/components/admin/ErrorHandler';
import AdminList from '@/components/admin/AdminList';

// 서버 사이드에서 관리자 목록을 가져오는 함수
async function fetchAdminList({
  pageNum,
  accessToken,
}: {
  pageNum: string;
  accessToken: string;
}): Promise<GetAdmin[]> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/list/${pageNum}/10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true, // 쿠키 포함
      },
    );
    console.log(response.data);
    return (response.data.data as GetAdmin[]) || [];
  } catch (error: any) {
    console.error(
      'Error fetching admin list:',
      error.response?.data?.message || error.message,
    );
    throw new Error(error.response?.data?.message || '오류가 발생했습니다.');
  }
}

export default async function Page({ params }: { params: { page: string } }) {
  const page = params.page;
  const cookiesObj = cookies();
  const accessToken = cookiesObj.get('accessToken')?.value || '';
  let admins: GetAdmin[] = [];
  let errorMessage = '';

  try {
    if (accessToken) {
      admins = await fetchAdminList({ pageNum: page, accessToken });
    } else {
      throw new Error('인증 토큰이 없습니다.');
    }
  } catch (error: any) {
    errorMessage = error.message;
  }

  const remains: number = 10 - admins.length;

  return (
    <>
      <AdminList admins={admins} remainsNum={remains} pageNum={page} />
      <div className={styles.pagination}>
        <Pagination pageNum={page} urlPath="admin" />
      </div>
      {errorMessage && <ErrorHandler message={errorMessage} />}
    </>
  );
}
