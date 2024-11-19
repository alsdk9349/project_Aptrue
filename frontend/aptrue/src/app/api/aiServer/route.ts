// pages/api/proxy-to-gpu.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const gpuResponse = await fetch(
        'http://70.12.130.111:8888/upload-video',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: req.headers.authorization, // 필요한 헤더 전달
          },
          body: req.body,
        },
      );

      if (!gpuResponse.ok) {
        return res
          .status(gpuResponse.status)
          .json({ error: 'GPU 서버 요청 실패' });
      }

      const data = await gpuResponse.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error('GPU 서버 요청 중 에러:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
