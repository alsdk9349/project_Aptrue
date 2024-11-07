'use client';

import { OpenVidu } from 'openvidu-browser';
import { useEffect, useState, useRef } from 'react';
import style from './CCTVWebRTC.module.scss';

export default function CCTVWebRTC() {
  const [session, setSession] = useState<any>(null);
  const [mainStreamManager, setMainStreamManager] = useState<any>(null);
  const videoRef = useRef(null); // 비디오 요소에 대한 참조 생성

  useEffect(() => {
    const OV = new OpenVidu();
    const session = OV.initSession();

    session.on('streamCreated', (event: any) => {
      const subscriber = session.subscribe(event.stream, undefined);
      setMainStreamManager(subscriber);
    });

    fetch('/api/webrtc/gettoken', { method: 'POST' })
      .then((response) => response.json())
      .then((data) => {
        const token = data.token;
        return session.connect(token);
      })
      .then(() => {
        setSession(session);
      })
      .catch((error) => {
        console.error('Error connecting to OpenVidu:', error);
      });

    return () => {
      if (session) session.disconnect();
    };
  }, []);

  useEffect(() => {
    // mainStreamManager와 videoRef가 둘 다 준비되었을 때 비디오 요소 추가
    if (mainStreamManager && videoRef.current) {
      mainStreamManager.addVideoElement(videoRef.current);
    }
  }, [mainStreamManager]); // mainStreamManager가 업데이트될 때마다 실행

  return (
    <div>
      {mainStreamManager ? (
        <div>
          <video ref={videoRef} autoPlay />
        </div>
      ) : (
        <p className={style.container}>Connecting to CCTV...</p>
      )}
    </div>
  );
}
