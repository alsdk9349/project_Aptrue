"use client";

import Button from "../common/button/Button";
// import { revalidateTag } from 'next/cache'; // 서버 컴포넌트에서만 작용
import { useState } from "react";
import ErrorModal from "./ErrorModal";
import { useRouter } from "next/navigation";

export default function DeleteButton({adminId}:{adminId:number}) {


    const [ openErrorModal, setOpenErrorModal ] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const router = useRouter();

    const delteAdmin = async () => {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/${adminId.toString()}`, {
            method: 'DELETE',
            credentials: 'include' // 쿠키를 포함해 서버와 통신(서버와의 인증을 위한 설정)
        });

        const result = await response.json();

        if (result.status === 200 && result.code==="A006") {
            console.log(result.message) //  "관리자를 삭제했습니다."
            setMessage(result.message)
            setOpenErrorModal(true);
            router.push(window.location.pathname);
            // revalidateTag('adminList'); // adminList 캐시 태그가 붙은 모든 항목을 무효화(클라이언트 컴포넌트에서 작동x)

        } else if (result.code === "M001") {
            setMessage(result.message)
            setOpenErrorModal(true);
            console.log('존재하지 않는 관리자입니다')

        } else {
            setMessage(result.message)
            setOpenErrorModal(true);
            console.log('관리자 삭제 실패')
        }
    }

    const closeModal = () => {
        setOpenErrorModal(false);
    }

    return (
        <>
            <Button size='webTiny' color='red' onClick={delteAdmin}>
                    삭제
            </Button>
            { openErrorModal &&
                <ErrorModal 
                message={message}
                isOpen={openErrorModal}
                onClose={closeModal}
                />
            }
        </>
    )
}