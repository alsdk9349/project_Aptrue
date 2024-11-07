'use client';

import { OpenVidu } from 'openvidu-browser';
import { useEffect, useState } from 'react';

export default function CCTVWebRTC() {
  const [session, setSession] = useState<any>(null);
  const [mainStreamManager, setMainStreamManager] = useState<any>(null);

  useEffect(() => {
    const OV = new OpenVidu();
    const session = OV.initSession();

    session.on('streamCreated', (event: any) => {
      const subscriber = session.subscribe(event.stream, undefined);
      setMainStreamManager(subscriber);
    });

    // Fetch token without using async/await
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

  return (
    <div>
      {mainStreamManager ? (
        <div ref={(el) => mainStreamManager.addVideoElement(el)} />
      ) : (
        <p>Connecting to CCTV...</p>
      )}
    </div>
  );
}
