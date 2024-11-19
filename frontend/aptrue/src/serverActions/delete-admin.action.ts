"use server"

import { revalidatePath } from "next/cache";

export async function deleteAdminAction ({
    page,
    adminId,
    accessToken
}:{
    page:string;
    adminId:number;
    accessToken:string;
}) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/${adminId.toString()}`, 
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`, // accessToken을 Authorization 헤더에 추가
            },
            credentials: 'include' // 쿠키를 포함해 서버와 통신(서버와의 인증을 위한 설정)
        }
    );
    revalidatePath(`/admin/${page}`)

        const result = await response.json();

        if (result.status === 200 && result.code==="A006") {
            // console.log(result.message) //  "관리자를 삭제했습니다."

            return { success:true, message:result.message}
            // setMessage(result.message)
            // setOpenErrorModal(true);
            // router.push(window.location.pathname);
            // revalidateTag('adminList'); // adminList 캐시 태그가 붙은 모든 항목을 무효화(클라이언트 컴포넌트에서 작동x)

        } else if (result.code === "M001") {

            return { success:false, message:result.message}
            // setMessage(result.message)
            // setOpenErrorModal(true);
            // console.log('존재하지 않는 관리자입니다')

        } else {

            return { success:false, message:result.message}
            // setMessage(result.message)
            // setOpenErrorModal(true);
            // console.log('관리자 삭제 실패')
        }
}