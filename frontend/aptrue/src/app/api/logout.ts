import { NextApiResponse, NextApiRequest } from 'next';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // 쿠키 만료를 위한 설정
        res.setHeader('Set-Cookie', 'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict;');
        res.status(200).json({ message: '로그아웃 성공' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}