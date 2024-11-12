"use server"

import { revalidatePath } from "next/cache";

type createAdminActionProps = PostAdmin & {accessToken:string; page:string}

export async function createAdminAction({name, account, password, phone, accessToken, page} : createAdminActionProps) {

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signup`, 
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, // accessToken을 Authorization 헤더에 추가
            },
            body: JSON.stringify({
                name:name,
                account:account,
                password:password,
                phone:phone
            }),
            credentials: 'include' // 쿠키를 포함해 서버와 통신(서버와의 인증을 위한 설정)
            }
        );
        revalidatePath(`/admin/${page}`)

        const result = await response.json();

        if (result.status === 200 && result.code==="A005") {

            return {success:true, message:result.message}

            // 입력 필드 초기화
            // setNewAdmin({
            //     name: '',
            //     account: '',
            //     password: '',
            //     phone: ''
            // });

            // setMessage(result.message)
            // setIsOpenErrorModal(true);
            // console.log(result.message) //  "새로운 관리자를 등록했습니다."
            // revalidateTag('adminList'); // adminList 캐시 태그가 붙은 모든 항목을 무효화(클라이언트 컴포넌트에서 작동하지 않음)

        } else if (result.code === "E003") {
            // setMessage(result.message)
            // setIsOpenErrorModal(true);
            // console.log('이미 등록된 관리자')
            return {success:false, message:result.message}


        } else {
            // setMessage('관리자 등록 실패')
            // setIsOpenErrorModal(true);
            return {success:false, message:result.message}

        }

    } catch (error) {
        return { success: false, message: '오류가 발생했습니다.' };
    }

}