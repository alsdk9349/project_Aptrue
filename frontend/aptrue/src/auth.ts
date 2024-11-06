import NextAuth  from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import {parse} from 'cookie';


export const {
    handlers: {GET, POST}, // api 라우트
    auth,
    signIn // 로그인용
} = NextAuth({
    pages: {
        // 우리는 여기서 로그인 하므로 로그인하는 페이지를 등록하기
        signIn: '/login'
    },
    // 로그아웃했을때 로그인 필요한 페이지 막는 방법!!! 
    callbacks:{
        // session검사했을떄 session이 없다면 redirect시키기
        // async authorized({auth}) {
        //     if (!auth) {
        //         return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`)
        //     }
        //     return true;
        // }
        // 세션에 엑세스 토큰 추가
        async session({session, token}) {
            session.accessToken = token.accessToken;
            return session
        },
        async jwt({token, user}) {

            // 사용자 정보있으면 토큰 추가
            if (user) {
                token.accessToken = (user as any).accessToken; // 타입 단언 사용
            }
            return token
        }
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              username: { label: "Username", type: "text" },
              // TO DO type : "password"
              password: { label: "Password", type: "text" },
            },
            // 세션을 생성할때 반환 값들 사용할 수 있음.
        authorize: async (credentials : any) => {
            
            try {
                    // TODO ${process.env.NEXT_PUBLIC_BASE_URL}
                const authResponse = await fetch(`http://k11c101.p.ssafy.io/api/login`, {
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    // credentials안에 username 이랑 password로 고정되어 있음. 그래서 바꿔주기
                    account: credentials.username ,
                    password:credentials.password
                    }),
                    credentials: "include" //쿠키를 포함한 요청
                })

                if (!authResponse.ok) {
                    return null
                }

                const cookies = authResponse.headers.get('set-cookie');
                if (!cookies) {
                    console.error('쿠키가 없습니다')
                    return null;
                }

                const parsedCookies = parse(cookies);
                const accessToken = parsedCookies["accessToken"]
                const refreshToken = parsedCookies["refreshToken"]

                if (!accessToken) {
                    console.error("엑세스토큰이 없습니다.")
                }

                const response = await authResponse.json();
                const user = response.data;
                console.log('로그인 성공 후 반환', user)

                return {
                    id: user.adminID,
                    account : user.account,
                    name: user.name,
                    isSuperAdmin:user.isSuperAdmin,
                    accessToken: accessToken
                }
            } catch (error) {
                console.log('로그인 실패', error)
                throw new Error('로그인 실패')
                // return null
            }
        },
        }),
  ],
  // TO DO
    //   secret: process.env.AUTH_SECRET,
});