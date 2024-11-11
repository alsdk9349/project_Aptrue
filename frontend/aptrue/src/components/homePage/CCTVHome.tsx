'use client';

import { useEffect, useRef, useState } from 'react';
import { OpenVidu } from 'openvidu-browser';
import style from './CCTVHome.module.scss';
import CCTVButton from './CCTVButton';
import CCTVScreen from './CCTV/CCTVScreen';

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
  '/videos/entrance.mp4',
  '/videos/park2.mp4',
  '/videos/park.mp4',
];

export default function CCTVHome() {
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeZone, setActiveZone] = useState<string>('101동 주변');
  const [streamReady, setStreamReady] = useState<boolean>(false);
  let addedVideoElement: HTMLVideoElement | null = null;
  let isSubscribed = false; // 중복 구독 방지 플래그

  useEffect(() => {
    const OV = new OpenVidu();
    const session = OV.initSession();

    const sessionId = 'ses_X10xmmKVaK';

    const initializeSubscriber = async () => {
      session.on('streamCreated', (event) => {
        // 중복 구독 방지
        if (isSubscribed) return;

        console.log('새 스트림이 생성되었습니다.');
        const subscriber = session.subscribe(event.stream, undefined);
        console.log(subscriber);
        isSubscribed = true; // 구독 상태를 true로 설정

        setTimeout(() => {
          const mediaStream = subscriber.stream?.getMediaStream();

          if (mediaStream && videoContainerRef.current) {
            // 기존 비디오 요소 제거
            if (
              addedVideoElement &&
              videoContainerRef.current.contains(addedVideoElement)
            ) {
              videoContainerRef.current.removeChild(addedVideoElement);
            }

            // 새로운 비디오 요소 생성 및 MediaStream 설정
            const videoElement = document.createElement('video');
            videoElement.srcObject = mediaStream;
            videoElement.autoplay = true;
            videoElement.playsInline = true;
            videoElement.muted = true;
            videoElement.className = style.webrtcVideo;

            videoContainerRef.current.appendChild(videoElement);
            addedVideoElement = videoElement;
            setStreamReady(true);
            console.log('MediaStream을 사용하여 비디오 요소가 추가되었습니다.');
            console.log(videoContainerRef.current);
            console.log('비디오요소', videoElement);
          } else {
            console.error('MediaStream을 가져오는 데 실패했습니다.');
          }
        }, 1000);
      });

      session.on('sessionDisconnected', () => {
        console.log('구독자 세션 연결이 해제됨');
        if (
          addedVideoElement &&
          videoContainerRef.current?.contains(addedVideoElement)
        ) {
          videoContainerRef.current.removeChild(addedVideoElement);
          addedVideoElement = null;
        }
        isSubscribed = false; // 구독 상태 초기화
      });

      try {
        const tokenResponse = await fetch(
          `${baseUrl}/session/${sessionId}/connections`,
          // `/api/webrtc/gettoken`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ role: 'SUBSCRIBER' }),
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
        addedVideoElement &&
        videoContainerRef.current?.contains(addedVideoElement)
      ) {
        videoContainerRef.current.removeChild(addedVideoElement);
      }
      console.log('구독자 세션 연결이 해제됨');
    };
  }, []);

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
    </div>
  );
}
