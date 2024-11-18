// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { OpenVidu } from 'openvidu-browser';
// import { useRecoilState } from 'recoil';
// import { detectionState } from '@/state/atoms/detection';
// import style from './CCTVHome.module.scss';
// import CCTVButton from './CCTVButton';
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
//   const webrtcVideoRef = useRef<HTMLVideoElement | null>(null);
//   const parkingVideoRef = useRef<HTMLVideoElement | null>(null);
//   const [activeZone, setActiveZone] = useState<string>('101동 주변');
//   const [model, setModel] = useState<any>(null);
//   const [parkingModel, setParkingModel] = useState<any>(null);
//   const [alertVisible, setAlertVisible] = useState<boolean>(false);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const [alertCategory, setAlertCategory] = useState<string | null>(null);
//   const [detectionCount, setDetectionCount] = useState<number>(0);
//   const [parkingDetectionCount, setParkingDetectionCount] = useState<number>(0);
//   const [isPaused, setIsPaused] = useState<boolean>(false);
//   const [streamReady, setStreamReady] = useState<boolean>(false);
//   const targetDetectionCnt = 5;
//   const parkingTargetDetectionCnt = 3;
//   const [detectionList, setDetectionList] = useRecoilState(detectionState);
//   let addedVideoElement: HTMLVideoElement | null = null;
//   let isSubscribed = false;

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

//   useEffect(() => {
//     const OV = new OpenVidu();
//     const session = OV.initSession();

//     const now = new Date();

//     const sessionId = `aptrue${now.getDate()}`;

//     const initializeSubscriber = async () => {
//       session.on('streamCreated', (event) => {
//         if (isSubscribed) return;

//         console.log('새 스트림이 생성되었습니다.');
//         const subscriber = session.subscribe(event.stream, undefined);
//         isSubscribed = true;

//         setTimeout(() => {
//           const mediaStream = subscriber.stream?.getMediaStream();
//           if (mediaStream && videoContainerRef.current) {
//             if (
//               addedVideoElement &&
//               videoContainerRef.current.contains(addedVideoElement)
//             ) {
//               videoContainerRef.current.removeChild(addedVideoElement);
//             }

//             const videoElement = document.createElement('video');
//             videoElement.srcObject = mediaStream;
//             videoElement.autoplay = true;
//             videoElement.playsInline = true;
//             videoElement.muted = true;
//             videoElement.className = style.webrtcVideo;

//             videoContainerRef.current.appendChild(videoElement);
//             addedVideoElement = videoElement;
//             setStreamReady(true);
//           } else {
//             console.error('MediaStream을 가져오는 데 실패했습니다.');
//           }
//         }, 1000);
//       });

//       try {
//         const tokenResponse = await fetch(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/session/${sessionId}/connection`,
//           {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             credentials: 'include',
//           },
//         );

//         const { token } = await tokenResponse.json();
//         await session.connect(token);
//         console.log('WebRTC 세션에 연결되었습니다.');
//       } catch (error) {
//         console.error('WebRTC 연결 오류:', error);
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
//       console.log('WebRTC 세션이 종료되었습니다.');
//     };
//   }, [model]);

//   const captureImage = (ref: React.RefObject<HTMLVideoElement>) => {
//     if (ref.current) {
//       const videoElement = ref.current;
//       const canvas = document.createElement('canvas');
//       canvas.width = videoElement.videoWidth;
//       canvas.height = videoElement.videoHeight;
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
//         return canvas.toDataURL('image/png');
//       }
//     }
//     return null;
//   };

//   const startDetection = (
//     model: any,
//     videoRef: React.RefObject<HTMLVideoElement>,
//     className: string,
//     category: string,
//     targetCount: number,
//     setCount: React.Dispatch<React.SetStateAction<number>>,
//   ) => {
//     if (!model || !videoRef.current || isPaused) return;

//     const detect = async () => {
//       const predictions = await model.predict(videoRef.current!);
//       console.log(`${className} 감지 결과:`, predictions);

//       const isDetected = predictions.some(
//         (prediction) =>
//           prediction.className === className && prediction.probability >= 0.9,
//       );

//       if (isDetected) {
//         setCount((prevCount) => {
//           const newCount = prevCount + 1;
//           if (newCount >= targetCount) {
//             const capturedImage = captureImage(videoRef);
//             if (capturedImage) {
//               // 상태 변경을 React 렌더링 이후에 수행
//               setTimeout(() => {
//                 const alertData = {
//                   category,
//                   timestamp: new Date().toISOString(),
//                   activeZone,
//                   image: capturedImage,
//                 };

//                 setDetectionList((prev) => [...prev, alertData]);
//                 setAlertCategory(category);
//                 setCapturedImage(capturedImage);
//                 setAlertVisible(true);
//                 setIsPaused(true);

//                 setTimeout(() => setIsPaused(false), 20000); // 10초 후 감지 재개
//               }, 0);
//             }
//             return 0; // 감지 카운트 초기화
//           }
//           return newCount;
//         });
//       }
//     };

//     const detectionInterval = setInterval(() => {
//       detect();
//     }, 1000);

//     return () => clearInterval(detectionInterval);
//   };

//   useEffect(() => {
//     if (model && webrtcVideoRef.current) {
//       const cleanup = startDetection(
//         model,
//         webrtcVideoRef,
//         'Fire',
//         '화재',
//         targetDetectionCnt,
//         setDetectionCount,
//       );
//       return () => cleanup && cleanup();
//     }
//   }, [model, webrtcVideoRef.current, isPaused]);

//   useEffect(() => {
//     if (parkingModel && parkingVideoRef.current) {
//       const cleanup = startDetection(
//         parkingModel,
//         parkingVideoRef,
//         '불법 주차',
//         '불법 주차',
//         parkingTargetDetectionCnt,
//         setParkingDetectionCount,
//       );
//       return () => cleanup && cleanup();
//     }
//   }, [parkingModel, parkingVideoRef.current, isPaused]);

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
//               {activeZone} cam0{index + 2}
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
//               />
//             ) : (
//               <video
//                 src={videoUrl}
//                 crossOrigin="anonymous"
//                 autoPlay
//                 muted
//                 loop
//                 controls={false}
//                 className={style.webrtcVideo}
//               />
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
import { useRecoilState } from 'recoil';
import { detectionState } from '@/state/atoms/detection';
import style from './CCTVHome.module.scss';
import CCTVButton from './CCTVButton';
import * as tmImage from '@teachablemachine/image';
import AlertModal from './AlertModal';

const moedelUrl = 'https://teachablemachine.withgoogle.com/models/se4VR7aTz';
const parkingModelUrl =
  'https://teachablemachine.withgoogle.com/models/B5hLPkmDN';

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
  'https://aptrue-s3-bucket.s3.ap-northeast-2.amazonaws.com/videos/241118/around101/133350.mov',
  'https://aptrue-s3-bucket.s3.ap-northeast-2.amazonaws.com/videos/241118/around101/175554.mov',
  'https://aptrue-s3-bucket.s3.ap-northeast-2.amazonaws.com/videos/241109/around101/175502.mov',
];

// export default function CCTVHome() {
//   const videoContainerRef = useRef<HTMLDivElement | null>(null);
//   const webrtcVideoRef = useRef<HTMLVideoElement | null>(null);
//   const parkingVideoRef = useRef<HTMLVideoElement | null>(null);
//   const otherVideoRefs = useRef<(HTMLVideoElement | null)[]>([]); // 배열 타입으로 수정
//   const [activeZone, setActiveZone] = useState<string>('101동 주변');
//   const [fireModel, setFireModel] = useState<any>(null);
//   const [parkingModel, setParkingModel] = useState<any>(null);
//   const [alertVisible, setAlertVisible] = useState<boolean>(false);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const [alertCategory, setAlertCategory] = useState<string | null>(null);
//   const [fireDetectionCount, setFireDetectionCount] = useState<number>(0);
//   const [parkingDetectionCount, setParkingDetectionCount] = useState<number>(0);
//   const [firePaused, setFirePaused] = useState<boolean>(false);
//   const [parkingPaused, setParkingPaused] = useState<boolean>(false);
//   const [detectionList, setDetectionList] = useRecoilState(detectionState);
//   let isSubscribed = false;
//   let addedVideoElement: HTMLVideoElement | null = null;
//   const [streamReady, setStreamReady] = useState<boolean>(false);
//   const [model, setModel] = useState(null);

//   const fireTargetCount = 5;
//   const parkingTargetCount = 3;

//   // Load Models
//   useEffect(() => {
//     async function loadModels() {
//       try {
//         const fireModelURL = `${moedelUrl}/model.json`;
//         const fireMetadataURL = `${moedelUrl}/metadata.json`;
//         const loadedFireModel = await tmImage.load(
//           fireModelURL,
//           fireMetadataURL,
//         );
//         setFireModel(loadedFireModel);
//         console.log('화재 모델 로딩 완료');

//         const parkingModelURL = `${parkingModelUrl}/model.json`;
//         const parkingMetadataURL = `${parkingModelUrl}/metadata.json`;
//         const loadedParkingModel = await tmImage.load(
//           parkingModelURL,
//           parkingMetadataURL,
//         );
//         setParkingModel(loadedParkingModel);
//         console.log('불법 주차 모델 로딩 완료');
//       } catch (error) {
//         console.error('모델 로딩 오류:', error);
//       }
//     }
//     loadModels();
//   }, []);

//   useEffect(() => {
//     const OV = new OpenVidu();
//     const session = OV.initSession();

//     const now = new Date();

//     // const sessionId = `aptrue${now.getDate()}`;
//     const sessionId = 'aptrue1';

//     const initializeSubscriber = async () => {
//       session.on('streamCreated', (event) => {
//         if (isSubscribed) return;

//         console.log('새 스트림이 생성되었습니다.');
//         const subscriber = session.subscribe(event.stream, undefined);
//         isSubscribed = true;

//         setTimeout(() => {
//           const mediaStream = subscriber.stream?.getMediaStream();
//           console.log(mediaStream);
//           if (mediaStream && videoContainerRef.current) {
//             if (
//               addedVideoElement &&
//               videoContainerRef.current.contains(addedVideoElement)
//             ) {
//               videoContainerRef.current.removeChild(addedVideoElement);
//             }

//             const videoElement = document.createElement('video');
//             videoElement.srcObject = mediaStream;
//             videoElement.autoplay = true;
//             videoElement.playsInline = true;
//             videoElement.muted = true;
//             videoElement.className = style.webrtcVideo;

//             videoContainerRef.current.appendChild(videoElement);
//             addedVideoElement = videoElement;
//             console.log('비디오 요소가 추가되었습니다:', videoElement);
//             setStreamReady(true);
//           } else {
//             console.error('MediaStream을 가져오는 데 실패했습니다.');
//           }
//         }, 1000);
//       });

//       try {
//         const tokenResponse = await fetch(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/session/${sessionId}/connection`,
//           {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             credentials: 'include',
//           },
//         );

//         const { token } = await tokenResponse.json();
//         await session.connect(token);
//         console.log('WebRTC 세션에 연결되었습니다.');
//       } catch (error) {
//         console.error('WebRTC 연결 오류:', error);
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
//       console.log('WebRTC 세션이 종료되었습니다.');
//     };
//   }, [model]);

//   // Capture Image
//   const captureImage = (videoRef: React.RefObject<HTMLVideoElement>) => {
//     if (videoRef.current) {
//       const canvas = document.createElement('canvas');
//       canvas.width = videoRef.current.videoWidth;
//       canvas.height = videoRef.current.videoHeight;
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//         return canvas.toDataURL('image/png');
//       }
//     }
//     return null;
//   };

//   // Fire Detection
//   const startFireDetection = () => {
//     if (!fireModel || !webrtcVideoRef.current || firePaused) return;

//     const detectFire = async () => {
//       const predictions = await fireModel.predict(webrtcVideoRef.current!);
//       console.log('화재감지 결과', predictions);
//       const isDetected = predictions.some(
//         (p) => p.className === 'Fire' && p.probability >= 0.9,
//       );

//       if (isDetected) {
//         setFireDetectionCount((prev) => {
//           const newCount = prev + 1;
//           if (newCount >= fireTargetCount) {
//             const image = captureImage(webrtcVideoRef);
//             if (image) {
//               setDetectionList((prev) => [
//                 ...prev,
//                 {
//                   category: '화재',
//                   timestamp: new Date().toISOString(),
//                   image,
//                 },
//               ]);
//               setAlertCategory('화재');
//               setCapturedImage(image);
//               setAlertVisible(true);
//               setFirePaused(true);
//               setTimeout(() => setFirePaused(false), 15000); // 10초 후 재개
//             }
//             return 0;
//           }
//           return newCount;
//         });
//       }
//     };

//     const fireInterval = setInterval(detectFire, 1000);
//     return () => clearInterval(fireInterval);
//   };

//   // Parking Detection
//   const startParkingDetection = () => {
//     if (!parkingModel || !parkingVideoRef.current || parkingPaused) return;

//     const detectParking = async () => {
//       const predictions = await parkingModel.predict(parkingVideoRef.current!);
//       console.log('불법주차 결과', predictions);
//       const isDetected = predictions.some(
//         (p) => p.className === '불법 주차' && p.probability >= 0.9,
//       );

//       if (isDetected) {
//         setParkingDetectionCount((prev) => {
//           const newCount = prev + 1;
//           if (newCount >= parkingTargetCount) {
//             const image = captureImage(parkingVideoRef);
//             if (image) {
//               setDetectionList((prev) => [
//                 ...prev,
//                 {
//                   category: '불법 주차',
//                   timestamp: new Date().toISOString(),
//                   image,
//                 },
//               ]);
//               setAlertCategory('불법 주차');
//               setCapturedImage(image);
//               setAlertVisible(true);
//               setParkingPaused(true);
//               setTimeout(() => setParkingPaused(false), 10000); // 10초 후 재개
//             }
//             return 0;
//           }
//           return newCount;
//         });
//       }
//     };

//     const parkingInterval = setInterval(detectParking, 1000);
//     return () => clearInterval(parkingInterval);
//   };

//   // Start Detection Effects
//   useEffect(() => {
//     const fireCleanup = startFireDetection();
//     return () => fireCleanup && fireCleanup();
//   }, [fireModel, firePaused]);

//   useEffect(() => {
//     const parkingCleanup = startParkingDetection();
//     return () => parkingCleanup && parkingCleanup();
//   }, [parkingModel, parkingPaused]);

//   // Alert Handlers
//   const handleCloseAlert = () => {
//     setAlertVisible(false);
//     setCapturedImage(null);
//   };

//   const handleZoneChange = (zone: string) => {
//     setActiveZone(zone);
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
//               {activeZone} cam0{index + 2}
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
//               />
//             ) : (
//               <video
//                 src={videoUrl}
//                 crossOrigin="anonymous"
//                 autoPlay
//                 muted
//                 loop
//                 controls={false}
//                 className={style.webrtcVideo}
//               />
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

export default function CCTVHome() {
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const webrtcVideoRef = useRef<HTMLVideoElement | null>(null);
  const parkingVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeZone, setActiveZone] = useState<string>('101동 주변');
  const [fireModel, setFireModel] = useState<any>(null);
  const [parkingModel, setParkingModel] = useState<any>(null);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [alertCategory, setAlertCategory] = useState<string | null>(null);
  const [fireDetectionCount, setFireDetectionCount] = useState<number>(0);
  const [parkingDetectionCounts, setParkingDetectionCounts] = useState<
    number[]
  >(videoUrls.map(() => 0)); // 각 비디오 감지 횟수
  const [firePaused, setFirePaused] = useState<boolean>(false); // 화재 감지 일시 중지 상태
  const [parkingPaused, setParkingPaused] = useState<boolean[]>(
    videoUrls.map(() => false),
  ); // 각 비디오의 일시 중지 상태
  const [streamReady, setStreamReady] = useState<boolean>(false);
  const [detectionList, setDetectionList] = useRecoilState(detectionState);
  const [sessionId, setSessionId] = useState<string>(null);

  const fireTargetCount = 2;
  const parkingTargetCount = 5;
  let isSubscribed = false;
  let addedVideoElement: HTMLVideoElement | null = null;

  // 모델 로드
  useEffect(() => {
    async function loadModels() {
      try {
        const fireModelURL = `${moedelUrl}/model.json`;
        const fireMetadataURL = `${moedelUrl}/metadata.json`;
        const loadedFireModel = await tmImage.load(
          fireModelURL,
          fireMetadataURL,
        );
        setFireModel(loadedFireModel);
        console.log('화재 모델 로딩 완료');

        const parkingModelURL = `${parkingModelUrl}/model.json`;
        const parkingMetadataURL = `${parkingModelUrl}/metadata.json`;
        const loadedParkingModel = await tmImage.load(
          parkingModelURL,
          parkingMetadataURL,
        );
        setParkingModel(loadedParkingModel);
        console.log('불법 주차 모델 로딩 완료');
      } catch (error) {
        console.error('모델 로딩 오류:', error);
      }
    }
    loadModels();
  }, []);

  // WebRTC 구독
  useEffect(() => {
    const OV = new OpenVidu();
    const session = OV.initSession();

    const now = new Date();
    // const sessionId = `aptrue${now.getDate()}`;
    // const sessionId = 'aptrue1';

    const initializeSubscriber = async () => {
      session.on('streamCreated', (event) => {
        if (isSubscribed) return;

        console.log('새 스트림이 생성되었습니다.');
        const subscriber = session.subscribe(event.stream, undefined);
        isSubscribed = true;

        setTimeout(() => {
          const mediaStream = subscriber.stream?.getMediaStream();
          console.log('MediaStream:', mediaStream);

          if (mediaStream && videoContainerRef.current) {
            //     if (
            //       addedVideoElement &&
            //       videoContainerRef.current.contains(addedVideoElement)
            //     ) {
            //       videoContainerRef.current.removeChild(addedVideoElement);
            //     }

            //     const videoElement = document.createElement('video');
            //     videoElement.srcObject = mediaStream;
            //     videoElement.autoplay = true;
            //     videoElement.playsInline = true;
            //     videoElement.muted = true;
            //     videoElement.className = style.webrtcVideo;

            //     videoContainerRef.current.appendChild(videoElement);
            //     addedVideoElement = videoElement;
            //     webrtcVideoRef.current = videoElement;
            //     setStreamReady(true);
            //     console.log('WebRTC 비디오가 추가되었습니다:', videoElement);
            //   } else {
            //     console.error('MediaStream을 가져오는 데 실패했습니다.');
            //   }
            // }, 1000);
            const videoElement = document.createElement('video');
            videoElement.srcObject = mediaStream;
            videoElement.autoplay = true;
            videoElement.playsInline = true;
            videoElement.muted = true;
            videoElement.className = style.webrtcVideo;

            videoContainerRef.current.appendChild(videoElement);
            webrtcVideoRef.current = videoElement;
            setStreamReady(true);
            console.log('WebRTC 비디오가 추가되었습니다:', videoElement);
          } else {
            console.error('MediaStream을 가져오는 데 실패했습니다.');
          }
        }, 1000);
      });

      try {
        const sessionRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/get/session`,
          {
            method: 'GET',
            credentials: 'include',
          },
        );

        // console.log('응답', sessionRes.json());

        if (!sessionRes.ok) {
          throw new Error('Session 가져오기 실패');
        }

        const sessionData = await sessionRes.json();
        console.log(sessionData);
        const Id = sessionData.data.sessionId;
        setSessionId(Id);
        // const Id = await sessionData.sessionId;

        const tokenResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/session/${Id}/connection`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          },
        );

        const { token } = await tokenResponse.json();
        await session.connect(token);
        console.log('WebRTC 세션에 연결되었습니다.');
      } catch (error) {
        console.error('WebRTC 연결 오류:', error);
      }
    };

    initializeSubscriber();

    return () => {
      session.disconnect();
      // if (
      //   addedVideoElement &&
      //   videoContainerRef.current?.contains(addedVideoElement)
      // ) {
      //   videoContainerRef.current.removeChild(addedVideoElement);
      // }
      console.log('WebRTC 세션이 종료되었습니다.');
    };
  }, []);

  // 감지 시작
  useEffect(() => {
    console.log(fireModel);
    console.log(webrtcVideoRef);
    if (!fireModel || firePaused) return;

    const detectFire = async () => {
      const predictions = await fireModel.predict(webrtcVideoRef.current!);
      console.log('화재감지 결과:', predictions);
      const isDetected = predictions.some(
        (p) => p.className === 'Fire' && p.probability >= 0.9,
      );

      if (isDetected) {
        setFireDetectionCount((prev) => {
          const newCount = prev + 1;
          if (newCount >= fireTargetCount) {
            const image = captureImage(webrtcVideoRef.current!);
            if (image) {
              setDetectionList((prev) => [
                ...prev,
                {
                  category: '화재',
                  timestamp: new Date().toISOString(),
                  activeZone: activeZone,
                  image,
                },
              ]);
              setAlertCategory('화재');
              setCapturedImage(image);
              setAlertVisible(true);
              setFirePaused(true);
              setTimeout(() => setFireDetectionCount(0), 10000); // 10초 후 재설정
            }
            return 0;
          }
          return newCount;
        });
      }
    };

    const fireInterval = setInterval(detectFire, 1000);
    return () => clearInterval(fireInterval);
  }, [fireModel, webrtcVideoRef]);

  useEffect(() => {
    if (!parkingModel) return;

    parkingVideoRefs.current.forEach((videoRef, index) => {
      if (!videoRef || parkingPaused[index] || index != 0) return;

      const detectParking = async () => {
        const predictions = await parkingModel.predict(videoRef);
        console.log(`불법 주차 감지 결과 (영상 ${index + 1}):`, predictions);
        const isDetected = predictions.some(
          (p) => p.className === '불법 주차' && p.probability >= 0.9,
        );

        if (isDetected) {
          setParkingDetectionCounts((prevCounts) => {
            const newCounts = [...prevCounts];
            newCounts[index] += 1;

            console.log('횟수', newCounts[index]);

            if (newCounts[index] >= parkingTargetCount) {
              const image = captureImage(videoRef);
              if (image) {
                setDetectionList((prev) => [
                  ...prev,
                  {
                    category: `불법 주차`,
                    timestamp: new Date().toISOString(),
                    activeZone: activeZone,
                    image,
                  },
                ]);
                setAlertCategory(`불법 주차`);
                setCapturedImage(image);
                setAlertVisible(true);

                const newPaused = [...parkingPaused];
                newPaused[index] = true;
                setParkingPaused(newPaused);

                setTimeout(() => {
                  const resetPaused = [...parkingPaused];
                  resetPaused[index] = false;
                  setParkingPaused(resetPaused);
                  // console.log('감지재개');
                }, 10000);
              }
              newCounts[index] = -10;
            }
            return newCounts;
          });
        }
      };

      const parkingInterval = setInterval(detectParking, 1000);
      return () => clearInterval(parkingInterval);
    });
  }, [parkingModel, parkingPaused]);

  const captureImage = (videoRef: HTMLVideoElement | null) => {
    if (videoRef) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.videoWidth;
      canvas.height = videoRef.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/png');
      }
    }
    return null;
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
    setCapturedImage(null);
  };

  const handleZoneChange = (zone: string) => {
    setActiveZone(zone);
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
              {activeZone} cam0{index + 1}
            </div>
            <video
              ref={(el) => {
                parkingVideoRefs.current[index] = el; // 값 할당만 수행
              }}
              src={videoUrl}
              crossOrigin="anonymous"
              autoPlay
              muted
              loop
              controls={false}
              className={style.webrtcVideo}
            />
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
