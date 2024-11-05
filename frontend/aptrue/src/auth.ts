import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
    handlers: {GET, POST}, // api 라우트
    auth,
    signIn // 로그인 하는 용
} = NextAuth({
    pages: {
        // 우리는 여기서 로그인 하므로 로그인하는 페이지를 등록하기
        signIn: '/login'
    },
    // 로그아웃했을때 로그인 필요한 페이지 막는 방법!!! 
    // callbacks:{
    //     // session검사했을떄 session이 없다면 redirect시키기
    //     async authorized({auth}) {
    //         if (!auth) {
    //             return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`)
    //         }
    //         return true;
    //     }
    // },
    providers: [
        CredentialsProvider({
            async authorize(credentials : any) {
                const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
                    method:"POST",
                    headers: {
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify({
                        // credentials안에 username 이랑 password로 고정되어 있음. 그래서 바꿔주기
                        account: credentials.username ,
                        password:credentials.password
                    }),
                })

                if (!authResponse.ok) {
                    return null
                }

                const user = await authResponse.json()

                return {
                    adminID: user.adminID,
                    account : user.account,
                    name: user.name,
                    isSuperAdmin:user.isSuperAdmin
                }
            }
        })]
});