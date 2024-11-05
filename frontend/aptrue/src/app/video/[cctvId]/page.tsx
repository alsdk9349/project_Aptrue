export default function Page({ params }: { params: { cctvId: string } }) {
  const { cctvId } = params;

  // S3에 업로드된 비디오의 URL (예시)
  const videoUrl = `https://your-s3-bucket-url/${cctvId}.mp4`;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <video
        src={videoUrl}
        controls
        style={{ maxWidth: '80%', maxHeight: '80%', border: '1px solid #ccc' }}
      >
        해당 비디오를 재생할 수 없습니다.
      </video>
    </div>
  );
}
