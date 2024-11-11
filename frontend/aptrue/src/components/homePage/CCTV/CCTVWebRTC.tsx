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

  const sessionId = 'sixbee';

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

            // `ondataavailable`에서 데이터 청크를 수집
            recorder.ondataavailable = (event) => {
              if (event.data.size > 0) {
                console.log('데이터 청크 수집:', event.data.size);
                recordedChunks.current.push(event.data);
              }
            };

            // `onstop`에서 데이터 수집 완료 후 처리
            recorder.onstop = async () => {
              if (recordedChunks.current.length === 0) {
                console.error('녹화된 데이터가 없습니다.');
                return;
              }

              const blob = new Blob(recordedChunks.current, {
                type: 'video/webm',
              });
              recordedChunks.current = []; // 청크 배열 초기화

              // // 비디오를 로컬에 저장하기 위한 다운로드 링크 생성
              // const url = URL.createObjectURL(blob);
              // const a = document.createElement('a');
              // a.href = url;
              // a.download = 'recording.webm';
              // a.click();
              // URL.revokeObjectURL(url);

              // 서버로 비디오 Blob 전송
              const formData = new FormData();
              formData.append('video', blob, 'recording.webm');
              // await fetch('/api/upload-video', {
              //   method: 'POST',
              //   body: formData,
              // });

              // 다음 녹화를 시작
              recorder.start();
              setTimeout(() => recorder.stop(), 60000); // 1분 후 중지
            };

            // 첫 번째 1분 녹화 시작
            recorder.start();
            setTimeout(() => recorder.stop(), 60000); // 1분 후 중지
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
  }, [role, setPublisher]);

  return (
    <div>
      <video ref={localVideoRef} autoPlay playsInline />
    </div>
  );
}
