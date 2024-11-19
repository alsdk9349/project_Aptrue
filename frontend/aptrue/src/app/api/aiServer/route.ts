// src/app/api/aiServer/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // 요청 본문 파싱
    const body = await req.json();

    // GPU 서버로 요청 전달
    const gpuResponse = await fetch('http://70.12.130.111:8888/upload-video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: req.headers.get('Authorization') || '', // 필요한 헤더 전달
      },
      body: JSON.stringify(body), // 요청 본문 전달
    });

    if (!gpuResponse.ok) {
      // GPU 서버 에러 처리
      return NextResponse.json(
        { error: 'GPU 서버 요청 실패' },
        { status: gpuResponse.status },
      );
    }

    // GPU 서버 응답 데이터 반환
    const data = await gpuResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('GPU 서버 요청 중 에러:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export const runtime = 'edge'; // Edge Runtime 설정 (선택 사항)
