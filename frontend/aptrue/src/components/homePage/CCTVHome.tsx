// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { OpenVidu } from 'openvidu-browser';
// import style from './CCTVHome.module.scss';
// import CCTVButton from './CCTVButton';
// import CCTVScreen from './CCTV/CCTVScreen';
// import * as tmImage from '@teachablemachine/image';
// import AlertModal from './AlertModal';

// const moedelUrl = 'https://teachablemachine.withgoogle.com/models/MoKOK2ts6';

// const parkingModelUrl =
//   'https://teachablemachine.withgoogle.com/models/gQVB8y1B4';

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
//   'https://aptrue-s3-bucket.s3.ap-northeast-2.amazonaws.com/videos/241115/around101/160450.mov',
//   'https://aptrue-s3-bucket.s3.ap-northeast-2.amazonaws.com/videos/241115/around101/154038.mov',
//   'https://aptrue-s3-bucket.s3.ap-northeast-2.amazonaws.com/videos/241115/101around/160134.mov',
// ];

// export default function CCTVHome() {
//   const videoContainerRef = useRef<HTMLDivElement | null>(null);
//   const videoElementRef = useRef<HTMLVideoElement | null>(null);
//   const [activeZone, setActiveZone] = useState<string>('101동 주변');
//   const [streamReady, setStreamReady] = useState<boolean>(false);
//   const [model, setModel] = useState<any>(null);
//   const [detectionCount, setDetectionCount] = useState<number>(0);
//   const [alertVisible, setAlertVisible] = useState<boolean>(false);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const targetDetectionCnt = 5;

//   const now = new Date();

//   const sessionId = `aptrue${now.getDate()}`;

//   useEffect(() => {
//     async function loadModel() {
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

//   // 캡처 함수
//   const captureImage = () => {
//     if (videoElementRef.current) {
//       const videoElement = videoElementRef.current;
//       const canvas = document.createElement('canvas');
//       canvas.width = videoElement.videoWidth;
//       canvas.height = videoElement.videoHeight;
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
//         const imageDataUrl = canvas.toDataURL('image/png');
//         setCapturedImage(imageDataUrl);
//       }
//     }
//   };

//   // 객체 탐지 함수
//   const startDetection = () => {
//     // console.log(videoElementRef);
//     if (!model || !videoElementRef.current) return;

//     const detect = async () => {
//       const predictions = await model.predict(videoElementRef.current!);
//       console.log(predictions);
//       const isTargetDetected = predictions.some(
//         (prediction) =>
//           prediction.className === 'Fire' && prediction.probability >= 0.9,
//       );

//       if (isTargetDetected) {
//         setDetectionCount((prevCount) => prevCount + 1);
//       }
//       // } else {
//       //   setDetectionCount(0);
//       // }
//     };

//     // 주기적으로 탐지 실행
//     const detectionInterval = setInterval(() => {
//       detect();
//     }, 1000);

//     return () => clearInterval(detectionInterval);
//   };

//   useEffect(() => {
//     console.log(detectionCount);

//     if (detectionCount >= targetDetectionCnt && !alertVisible) {
//       setAlertVisible(true);
//       captureImage();
//       console.log('알림: 객체가 반복적으로 탐지되었습니다.');
//     }
//   }, [detectionCount]);

//   useEffect(() => {
//     console.log(videoElementRef);
//     if (model && streamReady && videoElementRef.current) {
//       const detectionCleanup = startDetection();
//       return () => detectionCleanup && detectionCleanup();
//     }
//   }, [model, streamReady, videoElementRef.current]);

//   useEffect(() => {
//     const OV = new OpenVidu();
//     const session = OV.initSession();

//     const initializeSubscriber = async () => {
//       session.on('streamCreated', (event) => {
//         if (streamReady) return;

//         console.log('새 스트림이 생성되었습니다.');
//         const subscriber = session.subscribe(event.stream, undefined);

//         setTimeout(() => {
//           const mediaStream = subscriber.stream?.getMediaStream();

//           if (mediaStream && videoContainerRef.current) {
//             if (videoElementRef.current) {
//               videoContainerRef.current.removeChild(videoElementRef.current);
//             }

//             const videoElement = document.createElement('video');
//             videoElement.srcObject = mediaStream;
//             videoElement.autoplay = true;
//             videoElement.playsInline = true;
//             videoElement.muted = true;
//             videoElement.className = style.webrtcVideo;

//             videoContainerRef.current.appendChild(videoElement);
//             videoElementRef.current = videoElement;
//             setStreamReady(true);

//             console.log('MediaStream을 사용하여 비디오 요소가 추가되었습니다.');
//           } else {
//             console.error('MediaStream을 가져오는 데 실패했습니다.');
//           }
//         }, 1000);
//       });

//       session.on('sessionDisconnected', () => {
//         console.log('구독자 세션 연결이 해제됨');
//         if (
//           videoElementRef.current &&
//           videoContainerRef.current?.contains(videoElementRef.current)
//         ) {
//           videoContainerRef.current.removeChild(videoElementRef.current);
//           videoElementRef.current = null;
//         }
//       });

//       try {
//         const tokenResponse = await fetch(
//           `${baseUrl}/session/${sessionId}/connection`,
//           {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
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
//         videoElementRef.current &&
//         videoContainerRef.current?.contains(videoElementRef.current)
//       ) {
//         videoContainerRef.current.removeChild(videoElementRef.current);
//         videoElementRef.current = null;
//       }
//       console.log('구독자 세션 연결이 해제됨');
//     };
//   }, []);

//   const handleZoneChange = (zone: string) => {
//     setActiveZone(zone);
//   };

//   const handleCloseAlert = () => {
//     setAlertVisible(false);
//     setDetectionCount(0);
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

// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { OpenVidu } from 'openvidu-browser';
// import style from './CCTVHome.module.scss';
// import CCTVButton from './CCTVButton';
// import CCTVScreen from './CCTV/CCTVScreen';
// import * as tmImage from '@teachablemachine/image';
// import AlertModal from './AlertModal';

// const moedelUrl = 'https://teachablemachine.withgoogle.com/models/MoKOK2ts6';
// const parkingModelUrl =
//   'https://teachablemachine.withgoogle.com/models/gQVB8y1B4';

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
//   'https://aptrue-s3-bucket.s3.ap-northeast-2.amazonaws.com/videos/241115/around101/160450.mov',
//   'https://aptrue-s3-bucket.s3.ap-northeast-2.amazonaws.com/videos/241115/around101/154038.mov',
//   'https://aptrue-s3-bucket.s3.ap-northeast-2.amazonaws.com/videos/241115/101around/160134.mov',
// ];

// export default function CCTVHome() {
//   const videoContainerRef = useRef<HTMLDivElement | null>(null);
//   const videoElementRef = useRef<HTMLVideoElement | null>(null);
//   const parkingVideoRef = useRef<HTMLVideoElement | null>(null);
//   const [activeZone, setActiveZone] = useState<string>('101동 주변');
//   const [model, setModel] = useState<any>(null);
//   const [parkingModel, setParkingModel] = useState<any>(null);
//   const [alertVisible, setAlertVisible] = useState<boolean>(false);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const [detectionCount, setDetectionCount] = useState<number>(0);
//   const [parkingDetectionCount, setParkingDetectionCount] = useState<number>(0);
//   const [alertCategory, setAlertCategory] = useState<string>(null);
//   const targetDetectionCnt = 5;
//   const parkingTargetDetectionCnt = 3;

//   useEffect(() => {
//     async function loadModel() {
//       try {
//         const modelURL = `${moedelUrl}/model.json`;
//         const metadataURL = `${moedelUrl}/metadata.json`;
//         const loadedModel = await tmImage.load(modelURL, metadataURL);
//         setModel(loadedModel);
//         console.log('화재 모델 로딩 완료');
//       } catch (error) {
//         console.error('화재 모델 로딩 오류:', error);
//       }
//     }

//     async function loadParkingModel() {
//       try {
//         const modelURL = `${parkingModelUrl}/model.json`;
//         const metadataURL = `${parkingModelUrl}/metadata.json`;
//         const loadedParkingModel = await tmImage.load(modelURL, metadataURL);
//         setParkingModel(loadedParkingModel);
//         console.log('Parking 모델 로딩 완료');
//       } catch (error) {
//         console.error('Parking 모델 로딩 오류:', error);
//       }
//     }

//     loadModel();
//     loadParkingModel();
//   }, []);

//   const setupWebRTC = () => {
//     const OV = new OpenVidu();
//     const session = OV.initSession();

//     session.on('streamCreated', (event) => {
//       const subscriber = session.subscribe(event.stream, undefined);

//       setTimeout(() => {
//         const mediaStream = subscriber.stream?.getMediaStream();
//         if (mediaStream && videoContainerRef.current) {
//           if (videoElementRef.current) {
//             videoContainerRef.current.removeChild(videoElementRef.current);
//           }

//           const videoElement = document.createElement('video');
//           videoElement.srcObject = mediaStream;
//           videoElement.autoplay = true;
//           videoElement.playsInline = true;
//           videoElement.muted = true;
//           videoElement.className = style.webrtcVideo;

//           videoContainerRef.current.appendChild(videoElement);
//           videoElementRef.current = videoElement;
//           console.log('WebRTC 스트림 추가됨');
//         }
//       }, 1000);
//     });

//     session.on('sessionDisconnected', () => {
//       if (
//         videoElementRef.current &&
//         videoContainerRef.current?.contains(videoElementRef.current)
//       ) {
//         videoContainerRef.current.removeChild(videoElementRef.current);
//         videoElementRef.current = null;
//       }
//       console.log('WebRTC 세션이 해제되었습니다.');
//     });

//     const connectWebRTC = async () => {
//       try {
//         const tokenResponse = await fetch('/api/webrtc-token', {
//           method: 'POST',
//         });
//         const { token } = await tokenResponse.json();
//         await session.connect(token);
//         console.log('WebRTC 세션 연결 성공');
//       } catch (error) {
//         console.error('WebRTC 연결 실패:', error);
//       }
//     };

//     connectWebRTC();

//     return () => {
//       session.disconnect();
//     };
//   };

//   useEffect(() => {
//     const cleanup = setupWebRTC();
//     return () => cleanup && cleanup();
//   }, []);

//   // 동적 캡처 함수
//   const captureImage = (ref: React.RefObject<HTMLVideoElement>) => {
//     if (ref.current) {
//       const videoElement = ref.current;
//       const canvas = document.createElement('canvas');
//       canvas.width = videoElement.videoWidth;
//       canvas.height = videoElement.videoHeight;
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
//         const imageDataUrl = canvas.toDataURL('image/png');
//         setCapturedImage(imageDataUrl);
//         console.log('이미지 캡처 완료');
//       }
//     }
//   };

//   const startDetection = (
//     model: any,
//     videoRef: React.RefObject<HTMLVideoElement>,
//     setCount: React.Dispatch<React.SetStateAction<number>>,
//     className: string,
//   ) => {
//     if (!model || !videoRef.current) return;

//     const detect = async () => {
//       const predictions = await model.predict(videoRef.current!);
//       console.log(`${className} 감지 결과:`, predictions);

//       const isDetected = predictions.some(
//         (prediction) =>
//           prediction.className === className && prediction.probability >= 0.9,
//       );

//       if (isDetected) {
//         setCount((prevCount) => prevCount + 1);
//       }
//     };

//     const detectionInterval = setInterval(() => {
//       detect();
//     }, 1000);

//     return () => clearInterval(detectionInterval);
//   };

//   useEffect(() => {
//     if (detectionCount >= targetDetectionCnt) {
//       console.log('화재 감지: 알림 발생');
//       captureImage(videoElementRef);
//       setAlertCategory('화재');
//       setAlertVisible(true);
//       setDetectionCount(0);
//     }
//   }, [detectionCount]);

//   useEffect(() => {
//     if (parkingDetectionCount >= parkingTargetDetectionCnt) {
//       console.log('Parking 감지: 알림 발생');
//       setAlertCategory('불법 주차');
//       captureImage(parkingVideoRef);
//       setAlertVisible(true);
//       setParkingDetectionCount(0);
//     }
//   }, [parkingDetectionCount]);

//   useEffect(() => {
//     if (model && videoElementRef.current) {
//       const cleanup = startDetection(
//         model,
//         videoElementRef,
//         setDetectionCount,
//         'Fire',
//       );
//       return () => cleanup && cleanup();
//     }
//   }, [model, videoElementRef.current]);

//   useEffect(() => {
//     if (parkingModel && parkingVideoRef.current) {
//       const cleanup = startDetection(
//         parkingModel,
//         parkingVideoRef,
//         setParkingDetectionCount,
//         '불법 주차',
//       );
//       return () => cleanup && cleanup();
//     }
//   }, [parkingModel, parkingVideoRef.current]);

//   const handleZoneChange = (zone: string) => {
//     setActiveZone(zone);
//   };

//   const handleCloseAlert = () => {
//     setAlertVisible(false);
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
//         <div ref={videoContainerRef} className={style.videoItem}>
//           <div className={style.title}>{activeZone} cam01</div>
//         </div>
//         {videoUrls.map((videoUrl, index) => (
//           <div key={index} className={style.videoItem}>
//             <div className={style.title}>
//               {activeZone} cam0{index + 1}
//             </div>
//             {index === 1 ? (
//               <video
//                 ref={parkingVideoRef}
//                 src={videoUrl}
//                 crossOrigin="anonymous"
//                 autoPlay
//                 muted
//                 loop
//                 controls={false}
//                 className={style.webrtcVideo}
//               ></video>
//             ) : (
//               <video
//                 src={videoUrl}
//                 crossOrigin="anonymous"
//                 autoPlay
//                 muted
//                 loop
//                 controls={false}
//                 className={style.webrtcVideo}
//               ></video>
//             )}
//           </div>
//         ))}
//       </div>

//       {alertVisible && (
//         <AlertModal
//           category={alertCategory}
//           imgUrl={capturedImage}
//           activeZone={activeZone}
//           onClick={handleCloseAlert}
//         />
//       )}
//     </div>
//   );
// }

'use client';

import { useEffect, useRef, useState } from 'react';
import { OpenVidu } from 'openvidu-browser';
import style from './CCTVHome.module.scss';
import CCTVButton from './CCTVButton';
import * as tmImage from '@teachablemachine/image';
import AlertModal from './AlertModal';

const moedelUrl = 'https://teachablemachine.withgoogle.com/models/MoKOK2ts6';
const parkingModelUrl =
  'https://teachablemachine.withgoogle.com/models/gQVB8y1B4';

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
  const webrtcVideoRef = useRef<HTMLVideoElement | null>(null);
  const parkingVideoRef = useRef<HTMLVideoElement | null>(null);
  const [activeZone, setActiveZone] = useState<string>('101동 주변');
  const [model, setModel] = useState<any>(null);
  const [parkingModel, setParkingModel] = useState<any>(null);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [alertCategory, setAlertCategory] = useState<string | null>(null);
  const [detectionCount, setDetectionCount] = useState<number>(0);
  const [parkingDetectionCount, setParkingDetectionCount] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const targetDetectionCnt = 5;
  const parkingTargetDetectionCnt = 3;

  useEffect(() => {
    async function loadModel() {
      try {
        const modelURL = `${moedelUrl}/model.json`;
        const metadataURL = `${moedelUrl}/metadata.json`;
        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
        console.log('화재 모델 로딩 완료');
      } catch (error) {
        console.error('화재 모델 로딩 오류:', error);
      }
    }

    async function loadParkingModel() {
      try {
        const modelURL = `${parkingModelUrl}/model.json`;
        const metadataURL = `${parkingModelUrl}/metadata.json`;
        const loadedParkingModel = await tmImage.load(modelURL, metadataURL);
        setParkingModel(loadedParkingModel);
        console.log('Parking 모델 로딩 완료');
      } catch (error) {
        console.error('Parking 모델 로딩 오류:', error);
      }
    }

    loadModel();
    loadParkingModel();
  }, []);

  const setupWebRTC = () => {
    const OV = new OpenVidu();
    const session = OV.initSession();

    session.on('streamCreated', (event) => {
      const subscriber = session.subscribe(event.stream, undefined);

      setTimeout(() => {
        const mediaStream = subscriber.stream?.getMediaStream();
        if (mediaStream && videoContainerRef.current) {
          if (webrtcVideoRef.current) {
            videoContainerRef.current.removeChild(webrtcVideoRef.current);
          }

          const videoElement = document.createElement('video');
          videoElement.srcObject = mediaStream;
          videoElement.autoplay = true;
          videoElement.playsInline = true;
          videoElement.muted = true;
          videoElement.className = style.webrtcVideo;

          videoContainerRef.current.appendChild(videoElement);
          webrtcVideoRef.current = videoElement;
          console.log('WebRTC 스트림 추가됨');
        }
      }, 1000);
    });

    session.on('sessionDisconnected', () => {
      if (
        webrtcVideoRef.current &&
        videoContainerRef.current?.contains(webrtcVideoRef.current)
      ) {
        videoContainerRef.current.removeChild(webrtcVideoRef.current);
        webrtcVideoRef.current = null;
      }
      console.log('WebRTC 세션이 해제되었습니다.');
    });

    const connectWebRTC = async () => {
      try {
        const tokenResponse = await fetch('/api/webrtc-token', {
          method: 'POST',
        });
        const { token } = await tokenResponse.json();
        await session.connect(token);
        console.log('WebRTC 세션 연결 성공');
      } catch (error) {
        console.error('WebRTC 연결 실패:', error);
      }
    };

    connectWebRTC();

    return () => {
      session.disconnect();
    };
  };

  useEffect(() => {
    const cleanup = setupWebRTC();
    return () => cleanup && cleanup();
  }, []);

  const captureImage = (ref: React.RefObject<HTMLVideoElement>) => {
    if (ref.current) {
      const videoElement = ref.current;
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/png');
        setCapturedImage(imageDataUrl);
        console.log('이미지 캡처 완료');
      }
    }
  };

  const startDetection = (
    model: any,
    videoRef: React.RefObject<HTMLVideoElement>,
    className: string,
    category: string,
  ) => {
    if (!model || !videoRef.current || isPaused) return;

    const detect = async () => {
      const predictions = await model.predict(videoRef.current!);
      console.log(`${className} 감지 결과:`, predictions);

      const isDetected = predictions.some(
        (prediction) =>
          prediction.className === className && prediction.probability >= 0.9,
      );

      if (isDetected) {
        console.log(`${category} 감지: 알림 발생`);
        setAlertCategory(category);
        captureImage(videoRef);
        setAlertVisible(true);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 10000); // 10초 후 감지 재개
      }
    };

    const detectionInterval = setInterval(() => {
      detect();
    }, 1000);

    return () => clearInterval(detectionInterval);
  };

  useEffect(() => {
    if (model && webrtcVideoRef.current) {
      const cleanup = startDetection(model, webrtcVideoRef, 'Fire', '화재');
      return () => cleanup && cleanup();
    }
  }, [model, webrtcVideoRef.current, isPaused]);

  useEffect(() => {
    if (parkingModel && parkingVideoRef.current) {
      const cleanup = startDetection(
        parkingModel,
        parkingVideoRef,
        '불법 주차',
        '불법 주차',
      );
      return () => cleanup && cleanup();
    }
  }, [parkingModel, parkingVideoRef.current, isPaused]);

  const handleZoneChange = (zone: string) => {
    setActiveZone(zone);
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
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
        <div ref={videoContainerRef} className={style.videoItem}>
          <div className={style.title}>{activeZone} cam01</div>
        </div>
        {videoUrls.map((videoUrl, index) => (
          <div key={index} className={style.videoItem}>
            <div className={style.title}>
              {activeZone} cam0{index + 2}
            </div>
            {index === 1 ? (
              <video
                ref={parkingVideoRef}
                src={videoUrl}
                crossOrigin="anonymous"
                autoPlay
                muted
                loop
                controls={false}
                className={style.webrtcVideo}
              />
            ) : (
              <video
                src={videoUrl}
                crossOrigin="anonymous"
                autoPlay
                muted
                loop
                controls={false}
                className={style.webrtcVideo}
              />
            )}
          </div>
        ))}
      </div>

      {alertVisible && (
        <AlertModal
          category={alertCategory}
          imgUrl={capturedImage}
          activeZone={activeZone}
          onClick={handleCloseAlert}
        />
      )}
    </div>
  );
}
