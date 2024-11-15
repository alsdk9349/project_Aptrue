// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { OpenVidu } from 'openvidu-browser';
// import style from './CCTVHome.module.scss';
// import CCTVButton from './CCTVButton';
// import CCTVScreen from './CCTV/CCTVScreen';
// import * as tmImage from '@teachablemachine/image';
// import AlertModal from './AlertModal';

// const moedelUrl = 'https://teachablemachine.withgoogle.com/models/MoKOK2ts6';

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// const cctvZone = [
//   '101동 주변',
//   '102동 주변',
//   '101동 주차장',
//   '102동 주차장',
//   '아파트 입구',
//   '정문 경비실',
//   '후문 경비실',
//   '지하 스포츠센터',
//   '정문 어린이집',
// ];

// const videoUrls = [
//   '/videos/entrance.mp4',
//   '/videos/park2.mp4',
//   '/videos/park.mp4',
// ];

// export default function CCTVHome() {
//   const videoContainerRef = useRef<HTMLDivElement | null>(null);
//   const [activeZone, setActiveZone] = useState<string>('101동 주변');
//   const [streamReady, setStreamReady] = useState<boolean>(false);
//   let addedVideoElement: HTMLVideoElement | null = null;
//   let isSubscribed = false; // 중복 구독 방지 플래그
//   const now = new Date();
//   // const sessionId = `aptrue_${now.getDate()}`;
//   const sessionId = 'aptrue1';
//   const [model, setModel] = useState(null);
//   const [detectionCount, setDetectionCount] = useState<number>(0);
//   const [alertVisible, setAlertVisible] = useState<boolean>(false);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const targetDetectionCnt = 10;

//   useEffect(() => {
//     async function loadModel() {
//       // console.log('모델 연결');
//       try {
//         const modelURL = `${moedelUrl}/model.json`;
//         const metadataURL = `${moedelUrl}/metadata.json`;
//         const loadedModel = await tmImage.load(modelURL, metadataURL);
//         setModel(loadedModel);
//         console.log('모델 로딩 완료');
//       } catch (error) {
//         console.log('모델 로딩 오류', error);
//       }
//     }

//     loadModel();
//   }, []);

//   //캡처 함수
//   const captureImage = (videoElement: HTMLVideoElement) => {
//     const canvas = document.createElement('canvas');
//     canvas.width = videoElement.videoWidth;
//     canvas.height = videoElement.videoHeight;
//     const ctx = canvas.getContext('2d');
//     if (ctx) {
//       ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
//       const imageDataUrl = canvas.toDataURL('image/png');
//       setCapturedImage(imageDataUrl);
//     }
//   };

//   // 객체 탐지 함수
//   const startDetection = (videoElement: HTMLVideoElement) => {
//     console.log('객체 탐지 시작', model);
//     if (!model) return;

//     const detect = async () => {
//       const predictions = await model.predict(videoElement);
//       console.log('!!!', predictions);
//       const isTargetDetected = predictions.some(
//         (prediction) =>
//           prediction.className === 'Fire' && prediction.probability > 0.9,
//       );

//       if (isTargetDetected) {
//         setDetectionCount((prevCount) => prevCount + 1);
//       } else {
//         setDetectionCount(0);
//       }

//       if (detectionCount >= targetDetectionCnt && !alertVisible) {
//         setAlertVisible(true);
//         captureImage(videoElement);
//         console.log('알림: 객체가 반복적으로 탐지되었습니다.');
//       }

//       // requestAnimationFrame(detect);
//     };

//     // detect();
//     // 일정 주기로 탐지 함수 실행
//     const detectionInterval = setInterval(() => {
//       detect();
//     }, 1000); // 1000ms (1초) 간격으로 탐지 실행

//     return () => clearInterval(detectionInterval); // 컴포넌트가 언마운트될 때 인터벌 해제
//   };

//   useEffect(() => {
//     console.log(model);
//     console.log(addedVideoElement);
//     console.log(streamReady);
//     if (model && addedVideoElement && streamReady) {
//       const detectionInterval = setInterval(() => {
//         startDetection(addedVideoElement);
//       }, 1000);

//       return () => clearInterval(detectionInterval);
//     }
//   }, [model, streamReady, addedVideoElement]);

//   useEffect(() => {
//     const OV = new OpenVidu();
//     const session = OV.initSession();

//     // const sessionId = 'ses_JPXttfELkv';

//     const initializeSubscriber = async () => {
//       session.on('streamCreated', (event) => {
//         // 중복 구독 방지
//         if (isSubscribed) return;

//         console.log('새 스트림이 생성되었습니다.');
//         const subscriber = session.subscribe(event.stream, undefined);
//         console.log(subscriber);
//         isSubscribed = true; // 구독 상태를 true로 설정

//         setTimeout(() => {
//           const mediaStream = subscriber.stream?.getMediaStream();

//           if (mediaStream && videoContainerRef.current) {
//             // 기존 비디오 요소 제거
//             if (
//               addedVideoElement &&
//               videoContainerRef.current.contains(addedVideoElement)
//             ) {
//               videoContainerRef.current.removeChild(addedVideoElement);
//             }

//             // 새로운 비디오 요소 생성 및 MediaStream 설정
//             const videoElement = document.createElement('video');
//             videoElement.srcObject = mediaStream;
//             videoElement.autoplay = true;
//             videoElement.playsInline = true;
//             videoElement.muted = true;
//             videoElement.className = style.webrtcVideo;

//             videoContainerRef.current.appendChild(videoElement);
//             addedVideoElement = videoElement;
//             setStreamReady(true);

//             if (model) startDetection(videoElement);

//             console.log('MediaStream을 사용하여 비디오 요소가 추가되었습니다.');
//             console.log(videoContainerRef.current);
//             console.log('비디오요소', videoElement);
//           } else {
//             console.error('MediaStream을 가져오는 데 실패했습니다.');
//           }
//         }, 1000);
//       });

//       session.on('sessionDisconnected', () => {
//         console.log('구독자 세션 연결이 해제됨');
//         if (
//           addedVideoElement &&
//           videoContainerRef.current?.contains(addedVideoElement)
//         ) {
//           videoContainerRef.current.removeChild(addedVideoElement);
//           addedVideoElement = null;
//         }
//         isSubscribed = false; // 구독 상태 초기화
//       });

//       try {
//         const tokenResponse = await fetch(
//           `${baseUrl}/session/${sessionId}/connections`,
//           // `/api/webrtc/gettoken`,
//           {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             // body: JSON.stringify({ role: 'SUBSCRIBER' }),
//             credentials: 'include',
//           },
//         );

//         const { token } = await tokenResponse.json();
//         await session.connect(token);
//         console.log('구독자가 세션에 연결됨');
//       } catch (error) {
//         console.error('구독자 초기화 오류:', error);
//       }
//     };

//     initializeSubscriber();

//     return () => {
//       session.disconnect();
//       if (
//         addedVideoElement &&
//         videoContainerRef.current?.contains(addedVideoElement)
//       ) {
//         videoContainerRef.current.removeChild(addedVideoElement);
//       }
//       console.log('구독자 세션 연결이 해제됨');
//     };
//   }, []);

//   const handleZoneChange = (zone: string) => {
//     setActiveZone(zone);
//   };

//   const handleCloseAlert = () => {
//     setAlertVisible(false);
//     setDetectionCount(0); // 탐지 카운트 초기화
//     setCapturedImage(null);
//   };

//   return (
//     <div>
//       <div className={style.button}>
//         <CCTVButton
//           activeZone={activeZone}
//           setActiveZone={handleZoneChange}
//           cctvZone={cctvZone}
//         />
//       </div>
//       <div className={style.cctvContainer}>
//         <div
//           id="videoContainer"
//           ref={videoContainerRef}
//           className={style.videoItem}
//         >
//           <div className={style.title}>{activeZone} cam01</div>
//           {!streamReady && <div className={style.fallback}></div>}
//         </div>

//         {videoUrls.map((videoUrl, index) => (
//           <div key={index} className={style.videoItem}>
//             <CCTVScreen
//               activeZone={activeZone}
//               camNumber={index + 2}
//               videoUrl={videoUrl}
//               onClick={() => {}}
//             />
//           </div>
//         ))}
//       </div>

//       {/* <AlertModal
//         category="화재"
//         imgUrl="/images/cctv_fire.png"
//         activeZone={activeZone}
//         onClick={handleCloseAlert}
//       /> */}

//       {/* 알림 모달 */}
//       {alertVisible && (
//         <div className={style.alertModal}>
//           <AlertModal
//             category="화재"
//             imgUrl={capturedImage}
//             activeZone={activeZone}
//             onClick={handleCloseAlert}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { useEffect, useRef, useState } from 'react';
import { OpenVidu } from 'openvidu-browser';
import style from './CCTVHome.module.scss';
import CCTVButton from './CCTVButton';
import CCTVScreen from './CCTV/CCTVScreen';
import * as tmImage from '@teachablemachine/image';
import AlertModal from './AlertModal';

const moedelUrl = 'https://teachablemachine.withgoogle.com/models/MoKOK2ts6';

const parkingModelUrl =
  'https://teachablemachine.withgoogle.com/models/gQVB8y1B4';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const cctvZone = [
  '101동 주변',
  '102동 주변',
  '101동 주차장',
  '102동 주차장',
  '아파트 입구',
  '정문 경비실',
  '후문 경비실',
  '지하 스포츠센터',
  '정문 어린이집',
];

const videoUrls = [
  'https://aptrue-s3-bucket.s3.ap-northeast-2.amazonaws.com/videos/241115/around101/160450.mov',
  'https://aptrue-s3-bucket.s3.ap-northeast-2.amazonaws.com/videos/241115/around101/154038.mov',
  'https://aptrue-s3-bucket.s3.ap-northeast-2.amazonaws.com/videos/241115/101around/160134.mov',
];

export default function CCTVHome() {
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const [activeZone, setActiveZone] = useState<string>('101동 주변');
  const [streamReady, setStreamReady] = useState<boolean>(false);
  const [model, setModel] = useState<any>(null);
  const [detectionCount, setDetectionCount] = useState<number>(0);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const targetDetectionCnt = 5;

  const now = new Date();

  const sessionId = `aptrue${now.getDate()}`;

  useEffect(() => {
    async function loadModel() {
      try {
        const modelURL = `${moedelUrl}/model.json`;
        const metadataURL = `${moedelUrl}/metadata.json`;
        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
        console.log('모델 로딩 완료');
      } catch (error) {
        console.log('모델 로딩 오류', error);
      }
    }

    loadModel();
  }, []);

  // 캡처 함수
  const captureImage = () => {
    if (videoElementRef.current) {
      const videoElement = videoElementRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/png');
        setCapturedImage(imageDataUrl);
      }
    }
  };

  // 객체 탐지 함수
  const startDetection = () => {
    // console.log(videoElementRef);
    if (!model || !videoElementRef.current) return;

    const detect = async () => {
      const predictions = await model.predict(videoElementRef.current!);
      console.log(predictions);
      const isTargetDetected = predictions.some(
        (prediction) =>
          prediction.className === 'Fire' && prediction.probability >= 0.9,
      );

      if (isTargetDetected) {
        setDetectionCount((prevCount) => prevCount + 1);
      }
      // } else {
      //   setDetectionCount(0);
      // }
    };

    // 주기적으로 탐지 실행
    const detectionInterval = setInterval(() => {
      detect();
    }, 1000);

    return () => clearInterval(detectionInterval);
  };

  useEffect(() => {
    console.log(detectionCount);

    if (detectionCount >= targetDetectionCnt && !alertVisible) {
      setAlertVisible(true);
      captureImage();
      console.log('알림: 객체가 반복적으로 탐지되었습니다.');
    }
  }, [detectionCount]);

  useEffect(() => {
    console.log(videoElementRef);
    if (model && streamReady && videoElementRef.current) {
      const detectionCleanup = startDetection();
      return () => detectionCleanup && detectionCleanup();
    }
  }, [model, streamReady, videoElementRef.current]);

  useEffect(() => {
    const OV = new OpenVidu();
    const session = OV.initSession();

    const initializeSubscriber = async () => {
      session.on('streamCreated', (event) => {
        if (streamReady) return;

        console.log('새 스트림이 생성되었습니다.');
        const subscriber = session.subscribe(event.stream, undefined);

        setTimeout(() => {
          const mediaStream = subscriber.stream?.getMediaStream();

          if (mediaStream && videoContainerRef.current) {
            if (videoElementRef.current) {
              videoContainerRef.current.removeChild(videoElementRef.current);
            }

            const videoElement = document.createElement('video');
            videoElement.srcObject = mediaStream;
            videoElement.autoplay = true;
            videoElement.playsInline = true;
            videoElement.muted = true;
            videoElement.className = style.webrtcVideo;

            videoContainerRef.current.appendChild(videoElement);
            videoElementRef.current = videoElement;
            setStreamReady(true);

            console.log('MediaStream을 사용하여 비디오 요소가 추가되었습니다.');
          } else {
            console.error('MediaStream을 가져오는 데 실패했습니다.');
          }
        }, 1000);
      });

      session.on('sessionDisconnected', () => {
        console.log('구독자 세션 연결이 해제됨');
        if (
          videoElementRef.current &&
          videoContainerRef.current?.contains(videoElementRef.current)
        ) {
          videoContainerRef.current.removeChild(videoElementRef.current);
          videoElementRef.current = null;
        }
      });

      try {
        const tokenResponse = await fetch(
          `${baseUrl}/session/${sessionId}/connection`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          },
        );

        const { token } = await tokenResponse.json();
        await session.connect(token);
        console.log('구독자가 세션에 연결됨');
      } catch (error) {
        console.error('구독자 초기화 오류:', error);
      }
    };

    initializeSubscriber();

    return () => {
      session.disconnect();
      if (
        videoElementRef.current &&
        videoContainerRef.current?.contains(videoElementRef.current)
      ) {
        videoContainerRef.current.removeChild(videoElementRef.current);
        videoElementRef.current = null;
      }
      console.log('구독자 세션 연결이 해제됨');
    };
  }, []);

  const handleZoneChange = (zone: string) => {
    setActiveZone(zone);
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
    setDetectionCount(0);
    setCapturedImage(null);
  };

  return (
    <div>
      <div className={style.button}>
        <CCTVButton
          activeZone={activeZone}
          setActiveZone={handleZoneChange}
          cctvZone={cctvZone}
        />
      </div>
      <div className={style.cctvContainer}>
        <div
          id="videoContainer"
          ref={videoContainerRef}
          className={style.videoItem}
        >
          <div className={style.title}>{activeZone} cam01</div>
          {!streamReady && <div className={style.fallback}></div>}
        </div>

        {videoUrls.map((videoUrl, index) => (
          <div key={index} className={style.videoItem}>
            <CCTVScreen
              activeZone={activeZone}
              camNumber={index + 2}
              videoUrl={videoUrl}
              onClick={() => {}}
            />
          </div>
        ))}
      </div>

      {alertVisible && (
        <div className={style.alertModal}>
          <AlertModal
            category="화재"
            imgUrl={capturedImage}
            activeZone={activeZone}
            onClick={handleCloseAlert}
          />
        </div>
      )}
    </div>
  );
}
