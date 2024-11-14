'use client';
import { useState } from 'react';
import GeneralInput from '../common/input/GeneralInput';
import style from './cctvForm.module.scss';
import Button from '../common/button/Button';

export default function CCTVOriginal({
  detailInfo,
}: {
  detailInfo: requestDetailInfo;
}) {
  const [password, setPassword] = useState<string>('');
  const [showOrigin, setShowOrigin] = useState<boolean>(false);
  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // 추가적인 동작, 예: 서버 요청이나 실시간 검증
  };

  const handlePasswordSubmit = () => {
    // 비밀번호 입력 후 return이 맞으면 받아오기
    setPassword('');
    setShowOrigin((pre) => !pre);
  };
  const label = '비밀번호 입력';
  return (
    <div className={style['cctv-video-box']}>
      <div>관리자용 영상</div>
      <div className={style.container}>
        <div className={style.label}>
          {label.split('').map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </div>
        <input
          type="text"
          value={password}
          placeholder="관리자 계정 비밀번호 입력"
          onChange={handleInputPassword}
          className={style.short}
        />
        <Button color="blue" size="webTiny" onClick={handlePasswordSubmit}>
          입력
        </Button>
      </div>

      {showOrigin && (
        <div className={style['real-blue']}>
          <a
            href={`${window.location.origin}/video/${detailInfo.clipRQId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={style['real-blue']}
          >
            {`https://www.ssafy-aptrue/video/admin`}
          </a>
        </div>
      )}
    </div>
  );
}
