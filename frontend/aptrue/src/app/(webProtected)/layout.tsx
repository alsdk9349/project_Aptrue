import { ReactNode } from "react";
import AuthSession from "@/components/authSession/AuthSession";
import { useSession, signIn, signOut } from "next-auth/react";


export default function Layout({children}:{children:ReactNode}) {

    return (
        <AuthSession>
            {children}
        </AuthSession>
    )
}