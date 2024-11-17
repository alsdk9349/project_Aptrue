import { headers } from 'next/headers';

// import { revalidateTag } from 'next/cache';

// const url = process.env.NEXT_PUBLIC_BASE_URL;

// // CCTV 목록 조회
// // N페이지, 10개씩 조회
// export const CCTVPage = async (page: number) => {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/clip/list/${page}/10`,
//     {
//       method: 'GET',
//       headers: {
//         // Authorization: `Bearer ${accessToken}`, // 환경 변수에서 토큰 가져오기
//       },
//       credentials: 'include', // 쿠키를 포함해 서버와 통신(서버와의 인증을 위한 설정)
//       next: { tags: [`cctvList-${page}`] },
//     },
//   );

//   if (!response.ok) {
//     console.error(
//       `Failed to fetch data, status: ${response.status}`,
//       await response.text(),
//     );
//     throw new Error(`Failed to fetch data, status: ${response.status}`);
//   }

//   const result = await response.json();

//   console.log('[*] cctv page', result);

//   return result.data;
// };

// // CCTV Detail Page
// // Detail 내용 조회
// export const cctvDetailApi = async (clipRQId) => {
//   const response = await fetch(`${url}/clip/detail/${clipRQId}`, {
//     method: 'GET',
//     credentials: 'include',
//     next: { tags: [`cctvDetail-${clipRQId}`] },
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to fetch data, status: ${response.status}`);
//   }

//   const result = await response.json();
//   if (result) {
//     console.log('[*] result', result);

//     // setDetailInfo(result.data);
//     console.log(`[*] detail [Page] 페이지네이션 ${clipRQId}`, result);
//   }
//   return result.data;
// };

// // 민원 완료
// export const requestDoneAPI = async (clipRQId, accessToken) => {
//   console.log('[*] requestDoneAPI', url);
//   console.log(`[*] 민원처리 완료 clipRQId,accessToken`, clipRQId, accessToken);

//   const response = await fetch(`${url}/clip/complete/${clipRQId}`, {
//     method: 'POST',
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to fetch data, status: ${response.status}`);
//   }
//   revalidateTag(`cctvList-1`);
//   revalidateTag(`cctvDetail-${clipRQId}`);

//   const result = await response.json();
//   console.log('[*] result', result);
//   console.log(`[*] detail 민원처리 완료 ${clipRQId}`, result);
//   return result.data;
// };

// // CCTV request
// type CCTVRequestBody = Omit<
//   requestDetailInfo,
//   'clipRQId' | 'photoStatus' | 'clipList' | 'status'
// >;

// export const submitCCTVRequest = async (
//   requestBody: CCTVRequestBody,
//   accessToken,
// ) => {
//   console.log('[*] request Body', requestBody);
//   console.log('[*] accessToken', accessToken);

//   const response = await fetch(`${url}/clipRQ/new`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: JSON.stringify(requestBody),
//     credentials: 'include',
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     console.error(
//       `Failed to submit form, status: ${response.status}`,
//       errorText,
//     );
//     throw new Error(`Failed to submit form, status: ${response.status}`);
//   }

//   // 무효화 태그 호출
//   revalidateTag(`cctvList-1`);

//   const result = await response.json();
//   console.log('[*] Form submission result:', result);

//   return result;
// };

const url = process.env.NEXT_PUBLIC_BASE_URL;

export const cctvDetailApi = async (setDetailInfo, clipRQId) => {
  const response = await fetch(`${url}/clip/detail/${clipRQId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data, status: ${response.status}`);
  }

  const result = await response.json();
  if (result) {
    console.log('[*] result', result);

    setDetailInfo(result.data);
    console.log(`[*] detail [Page] 페이지네이션 ${clipRQId}`, result);
  }
};

export const requestDoneAPI = async (clipRQId, accessToken) => {
  const response = await fetch(`${url}/clip/complete/${clipRQId}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data, status: ${response.status}`);
  }

  const result = await response.json();
  console.log('[*] result', result);
  console.log(`[*] detail 민원처리 완료 ${clipRQId}`, result);
};

export const confirmPassword = async (clipRQId, accessToken, password) => {
  const response = await fetch(`${url}/checkPassword`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      clipRQId,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data, status: ${response.status}`);
  }

  const result = await response.json();
  console.log('[*] 관리자 비밀번호 확인', result.data);

  return result.data.videos;
};
