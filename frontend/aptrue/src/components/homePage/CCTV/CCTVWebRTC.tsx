// // CCTVWebRTC.tsx
// 'use client';

// import { useEffect, useRef } from 'react';
// import { OpenVidu } from 'openvidu-browser';
// import { useRecoilState } from 'recoil';
// import { publisherState } from '@/state/atoms/webrtcAtoms';

// export default function CCTVWebRTC({ role }: { role?: string }) {
//   const localVideoRef = useRef<HTMLVideoElement | null>(null);
//   const [newPublisher, setPublisher] = useRecoilState(publisherState);

//   useEffect(() => {
//     const OV = new OpenVidu();
//     const session = OV.initSession();

//     const initializeSession = async () => {
//       try {
//         // 서버에서 고정된 sessionId에 대한 토큰을 요청
//         const tokenResponse = await fetch('/api/webrtc/gettoken', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ role }),
//         });

//         const response = await tokenResponse.json();

//         // 서버에서 받은 토큰으로 세션에 연결
//         await session.connect(response.token);

//         if (role === 'PUBLISHER') {
//           const publisher = OV.initPublisher(undefined, {
//             videoSource: undefined, // 기본 카메라와 마이크 사용
//             audioSource: undefined,
//             publishAudio: true,
//             publishVideo: true,
//             resolution: '640x480',
//           });

//           await session.publish(publisher).then(() => {
//             console.log(session);
//             console.log('스트림', publisher.stream);
//           });
//           setPublisher(publisher);

//           // 로컬 비디오 요소에 스트림을 설정
//           const newMediaStream = publisher.stream?.getMediaStream();
//           if (newMediaStream && localVideoRef.current) {
//             // console.log('여긴오나..?');
//             localVideoRef.current.srcObject = newMediaStream;
//           }
//           console.log(`[${role}] Publisher started streaming`);
//         }
//       } catch (error) {
//         console.error(`Error initializing ${role}:`, error);
//       }
//     };

//     initializeSession();

//     return () => {
//       session.disconnect();
//       setPublisher(null);
//     };
//   }, [role, setPublisher]);

//   return (
//     <div>
//       <video ref={localVideoRef} autoPlay playsInline />
//     </div>
//   );
// }

// //1분마다 녹화 후 서버에 전송
'use client';
import { useEffect, useRef, useState } from 'react';
import { OpenVidu, Session } from 'openvidu-browser';
import { useRecoilState } from 'recoil';
import { publisherState } from '@/state/atoms/webrtcAtoms';

export default function CCTVWebRTC({ role }: { role?: string }) {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const [newPublisher, setPublisher] = useRecoilState(publisherState);
  const sessionRef = useRef<Session | null>(null);
  const recordedChunks = useRef<Blob[]>([]); // 수집된 데이터 청크를 저장

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const sessionId = 'aptrue';

  useEffect(() => {
    const OV = new OpenVidu();
    sessionRef.current = OV.initSession();

    // const sessionId = 'ses_JPXttfELkv';

    const initializeSession = async () => {
      try {
        const tokenResponse = await fetch(
          `${baseUrl}/session/${sessionId}/connections`,
          // '/api/webrtc/gettoken',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ role }),
            credentials: 'include',
          },
        );

        const { token } = await tokenResponse.json();
        await sessionRef.current?.connect(token);

        if (role === 'PUBLISHER') {
          const publisher = OV.initPublisher(undefined, {
            videoSource: undefined,
            audioSource: false,
            publishAudio: false,
            publishVideo: true,
            resolution: '640x480',
          });

          await sessionRef.current?.publish(publisher);
          setPublisher(publisher);

          const newMediaStream = publisher.stream?.getMediaStream();
          if (newMediaStream && localVideoRef.current) {
            localVideoRef.current.srcObject = newMediaStream;

            const recorder = new MediaRecorder(newMediaStream, {
              mimeType: 'video/webm; codecs=vp8',
            });

            // 1분(60000ms)마다 ondataavailable 이벤트 발생
            recorder.start(60000);

            recorder.ondataavailable = async (event) => {
              if (event.data.size > 0) {
                console.log('데이터 청크 수집:', event.data.size);

                // 녹화된 Blob 생성
                const blob = event.data;

                // 현재 날짜와 시간을 가져옵니다.
                const now = new Date();

                // 날짜를 YYMMDD 형식으로 변환합니다.
                const date =
                  now.getFullYear().toString().slice(2) + // 연도의 마지막 두 자리
                  ('0' + (now.getMonth() + 1)).slice(-2) + // 월 (두 자리 수)
                  ('0' + now.getDate()).slice(-2); // 일 (두 자리 수)

                // 시간을 HHMMSS 형식으로 변환합니다.
                const time =
                  ('0' + now.getHours()).slice(-2) + // 시 (두 자리 수)
                  ('0' + now.getMinutes()).slice(-2) + // 분 (두 자리 수)
                  ('0' + now.getSeconds()).slice(-2); // 초 (두 자리 수)

                // 장소 정보를 설정합니다. 예를 들어 'around101'
                const place = 'around101';

                // 파일 이름을 생성합니다.
                const filename = `${date}-${place}-${time}.webm`;

                // 서버로 비디오 Blob 전송
                const formData = new FormData();
                formData.append('video', blob, filename);

                try {
                  const uploadResponse = await fetch('/api/upload-video', {
                    method: 'POST',
                    body: formData,
                  });

                  if (uploadResponse.ok) {
                    console.log('비디오 업로드 성공:', filename);
                  } else {
                    console.error(
                      '비디오 업로드 실패:',
                      uploadResponse.statusText,
                    );
                  }
                } catch (uploadError) {
                  console.error('비디오 업로드 중 에러 발생:', uploadError);
                }
              }
            };

            recorder.onerror = (event: ErrorEvent) => {
              console.error('녹화 중 에러 발생:', event.error);
            };
          }
        }
      } catch (error) {
        console.error(`Error initializing ${role}:`, error);
      }
    };

    initializeSession();

    return () => {
      if (sessionRef.current) {
        sessionRef.current.disconnect();
      }
      setPublisher(null);
    };
  }, [role, setPublisher, baseUrl, sessionId]);

  return (
    <div>
      <video ref={localVideoRef} autoPlay playsInline />
    </div>
  );
}
