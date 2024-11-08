// 'use client';

// import { OpenVidu } from 'openvidu-browser';
// import { useEffect, useState, useRef } from 'react';
// import style from './CCTVWebRTC.module.scss';

// export default function CCTVWebRTC() {
//   const [session, setSession] = useState<any>(null);
//   const [mainStreamManager, setMainStreamManager] = useState<any>(null);
//   const videoRef = useRef(null); // 비디오 요소에 대한 참조 생성

//   useEffect(() => {
//     const OV = new OpenVidu();
//     const session = OV.initSession();

//     session.on('streamCreated', (event: any) => {
//       const subscriber = session.subscribe(event.stream, undefined);
//       setMainStreamManager(subscriber);
//     });

//     fetch('/api/webrtc/gettoken', { method: 'POST' })
//       .then((response) => response.json())
//       .then((data) => {
//         const token = data.token;
//         return session.connect(token);
//       })
//       .then(() => {
//         setSession(session);
//       })
//       .catch((error) => {
//         console.error('Error connecting to OpenVidu:', error);
//       });

//     return () => {
//       if (session) session.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     // mainStreamManager와 videoRef가 둘 다 준비되었을 때 비디오 요소 추가
//     if (mainStreamManager && videoRef.current) {
//       mainStreamManager.addVideoElement(videoRef.current);
//     }
//   }, [mainStreamManager]); // mainStreamManager가 업데이트될 때마다 실행

//   return (
//     <div>
//       {mainStreamManager ? (
//         <div>
//           <video ref={videoRef} autoPlay />
//         </div>
//       ) : (
//         <p className={style.container}>Connecting to CCTV...</p>
//       )}
//     </div>
//   );
// }

// 'use client';

// import { OpenVidu, StreamManager, Session } from 'openvidu-browser';
// import { useEffect, useState, useRef } from 'react';
// import style from './CCTVWebRTC.module.scss';

// export default function CCTVWebRTC() {
//   const [session, setSession] = useState<Session | null>(null);
//   const [mainStreamManager, setMainStreamManager] =
//     useState<StreamManager | null>(null);
//   const videoRef = useRef<HTMLVideoElement | null>(null); // 비디오 요소에 대한 참조 생성

//   useEffect(() => {
//     // OpenVidu 세션 생성
//     const OV = new OpenVidu();
//     const session = OV.initSession();

//     // 스트림 생성 시 실행될 이벤트 리스너
//     session.on('streamCreated', (event) => {
//       const subscriber = session.subscribe(event.stream, undefined);
//       setMainStreamManager(subscriber);

//       console.log('Subscriber set:', subscriber);

//       // 비디오 요소가 렌더링된 후에 추가
//       if (videoRef.current) {
//         subscriber.addVideoElement(videoRef.current);
//       }
//     });

//     // 토큰 요청 및 세션 연결
//     fetch('/api/webrtc/gettoken', { method: 'POST' })
//       .then((response) => response.json())
//       .then((data) => {
//         const token = data.token;
//         return session.connect(token);
//       })
//       .then(() => {
//         console.log('세션 연결');
//         setSession(session);

//         // 발행자 생성 및 스트림 발행
//         const publisher = OV.initPublisher(undefined, {
//           audioSource: undefined,
//           videoSource: undefined,
//           publishAudio: true,
//           publishVideo: true,
//           resolution: '640x480',
//           frameRate: 30,
//           insertMode: 'APPEND',
//           mirror: true,
//         });
//         session.publish(publisher);
//       })
//       .catch((error) => {
//         console.error('Error connecting to OpenVidu:', error);
//       });

//     // 컴포넌트 언마운트 시 세션 종료
//     return () => {
//       if (session) session.disconnect();
//     };
//   }, []);

//   // mainStreamManager가 업데이트될 때마다 비디오 요소에 스트림 추가
//   useEffect(() => {
//     if (mainStreamManager && videoRef.current) {
//       mainStreamManager.addVideoElement(videoRef.current as HTMLVideoElement);
//     }
//   }, [mainStreamManager]);

//   return (
//     <div className={style.container}>
//       {mainStreamManager ? (
//         <div>
//           <video ref={videoRef} autoPlay />
//         </div>
//       ) : (
//         <p>Connecting to CCTV...</p>
//       )}
//     </div>
//   );
// }

// 'use client';

// import { OpenVidu, StreamManager, Session, Publisher } from 'openvidu-browser';
// import { useEffect, useState, useRef } from 'react';
// import style from './CCTVWebRTC.module.scss';

// export default function CCTVWebRTC() {
//   const [session, setSession] = useState<Session | null>(null);
//   const [publisher, setPublisher] = useState<Publisher | null>(null);
//   const videoRef = useRef<HTMLVideoElement | null>(null); // 비디오 요소에 대한 참조 생성

//   useEffect(() => {
//     const OV = new OpenVidu();
//     const session = OV.initSession();

//     // 이벤트 리스너를 설정합니다
//     session.on('streamCreated', (event) => {
//       const subscriber = session.subscribe(event.stream, undefined);
//       if (videoRef.current) {
//         subscriber.addVideoElement(videoRef.current);
//       }
//       console.log('Subscriber video added to video element');
//     });

//     // 토큰 요청 및 세션 연결
//     fetch('/api/webrtc/gettoken', { method: 'POST' })
//       .then((response) => response.json())
//       .then((data) => {
//         const token = data.token;
//         return session.connect(token);
//       })
//       .then(() => {
//         console.log('세션 연결');
//         setSession(session);

//         // 발행자 생성 및 스트림 발행
//         const publisher = OV.initPublisher(undefined, {
//           audioSource: undefined,
//           videoSource: undefined,
//           publishAudio: true,
//           publishVideo: true,
//           resolution: '640x480',
//           frameRate: 30,
//           insertMode: 'APPEND',
//           mirror: true,
//         });

//         setPublisher(publisher);
//         session.publish(publisher);

//         // 비디오 요소가 렌더링된 후 발행자의 비디오 스트림 추가
//         if (videoRef.current) {
//           publisher.addVideoElement(videoRef.current);
//         }
//       })
//       .catch((error) => {
//         console.error('Error connecting to OpenVidu:', error);
//       });

//     return () => {
//       if (session) session.disconnect();
//     };
//   }, []);

//   return (
//     <div className={style.videoContainer}>
//       {publisher ? (
//         <div>
//           <video ref={videoRef} className={style.video} autoPlay playsInline />
//         </div>
//       ) : (
//         <p className={style.container}>Connecting to CCTV...</p>
//       )}
//     </div>
//   );
// }

'use client';

import { OpenVidu, Publisher } from 'openvidu-browser';
import { useEffect, useState, useRef } from 'react';
import style from './CCTVWebRTC.module.scss';

export default function CCTVWebRTC({ onClick }: { onClick: () => void }) {
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const OV = new OpenVidu();
    const session = OV.initSession();

    fetch('/api/webrtc/gettoken', { method: 'POST' })
      .then((response) => response.json())
      .then((data) => session.connect(data.token))
      .then(() => {
        const publisher = OV.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: '640x480',
          frameRate: 30,
          insertMode: 'APPEND',
          mirror: true,
        });
        setPublisher(publisher);
        session.publish(publisher);

        if (videoRef.current) {
          publisher.addVideoElement(videoRef.current);
        }
      })
      .catch((error) => console.error('Error connecting to OpenVidu:', error));

    return () => {
      if (session) session.disconnect();
    };
  }, []);

  return (
    <div className={style.video} onClick={onClick}>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
}
