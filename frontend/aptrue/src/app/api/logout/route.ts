// src/app/api/logout/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    console.log('로그아웃 요청 수신');

    const response = NextResponse.json(
        { message: '로그아웃 성공' },
        { status: 200 }
    );

    const cookies = [
        'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None;',
        'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None;',
    ];

    cookies.forEach((cookie) => {
        response.headers.append('Set-Cookie', cookie);
    });

    return response;
}



// export const dynamic = 'force-dynamic';

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function POST(req: NextRequest) {
//     console.log('로그아웃 요청 수신');

//     const response = NextResponse.json(
//         { message: '로그아웃 성공' },
//         { status: 200 }
//     );

//     const cookies = [
//         'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict;',
//         'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict;',
//     ];

//     cookies.forEach((cookie) => {
//         response.headers.append('Set-Cookie', cookie);
//     });

//     return response;
// }




