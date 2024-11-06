import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";


// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//     } & DefaultSession["user"];
//   }
// }

// Session 타입 확장
declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        account: string;
        isSuperAdmin: boolean;
      } & DefaultSession["user"];
      accessToken: string; // accessToken 속성 추가
    }
  }
  
  // JWT 타입 확장
  declare module "next-auth/jwt" {
    interface JWT {
      accessToken: string; // JWT에 accessToken 추가
    }
  }