import { Suspense } from "react"
import ChangePasswordForm from "@/components/login/ChangePasswordForm"

export default function Page() {

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <ChangePasswordForm />
            </Suspense>
        </>
    )
}