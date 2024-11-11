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
    // credentials: 'include',
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
