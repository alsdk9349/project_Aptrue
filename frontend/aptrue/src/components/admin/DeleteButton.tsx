"use client";

import Button from "../common/button/Button";
// import { revalidateTag } from 'next/cache'; // 서버 컴포넌트에서만 작용
import { useState } from "react";
import ErrorModal from "./ErrorModal";
import { useRouter, useParams } from "next/navigation";
import { deleteAdminAction } from "@/serverActions/delete-admin.action";
import Cookies from "js-cookie";

export default function DeleteButton({adminId}:{adminId:number}) {

    const accessToken = Cookies.get('accessToken');

    const {page} : {page:string} = useParams();
    const [ openErrorModal, setOpenErrorModal ] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const router = useRouter();

    const delteAdmin = async () => {

        const result = await deleteAdminAction({
            page,
            adminId,
            accessToken
        })

        setMessage(result.message)
        setOpenErrorModal(true)
        
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