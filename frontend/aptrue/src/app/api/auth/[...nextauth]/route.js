import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "account", type: "text", placeholder: "jsmith" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        // 백엔드 서버로 요청
        const res = await fetch("https://백서버/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const user = await res.json();

        if (res.ok && user) {
          // 인증이 성공 => user 객체를 반환
          return user;
        } else {
          // 인증에 실패 => null을 반환하여 에러를 표시
          return null;
        }
      },
    }),
  ],
  // 기타 옵션 설정
  callbacks: {
    async jwt({ token, user }) {
      // 사용자가 인증되면 JWT에 사용자 정보를 추가합니다.
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // JWT에서 세션 정보를 가져옵니다.
      session.user = token;
      return session;
    },
  },
  // 쿠키에 토큰 저장 설정
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
  },
});
