'use client';
import { useEffect, useState } from 'react';
import style from './cctvForm.module.scss';
import Button from '../common/button/Button';
import { confirmPassword } from '@/api/cctvAPI';
import Cookies from 'js-cookie';

export default function CCTVOriginal({
  detailInfo,
}: {
  detailInfo: requestDetailInfo;
}) {
  const accessToken = Cookies.get('accessToken');
  const [password, setPassword] = useState<string>('');
  const [showOrigin, setShowOrigin] = useState<boolean>(false);
  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // 추가적인 동작, 예: 서버 요청이나 실시간 검증
  };

  const handlePasswordSubmit = async () => {
    // 비밀번호 입력 후 return이 맞으면 받아오기
    try {
      // 비밀번호 입력 후 결과를 받아오기
      const result = await confirmPassword(detailInfo.clipRQId,accessToken,password);

      console.log('[*] 관리자 비밀번호 확인', result);
      setPassword('');
      setShowOrigin(result);
    } catch (error) {
      console.error('비밀번호 확인 중 오류 발생:', error);
      // 필요하다면 에러 상태를 추가적으로 관리하거나 사용자에게 알림
    }
  };

  useEffect(() => {
    console.log('[*] 관리자 비밀번호 확인 후 재렌더링', showOrigin);
  }, [showOrigin]);

  const label = '비밀번호 입력';
  return (
    <div className={style['cctv-video-box']}>
      <div>관리자용 영상</div>
      {!showOrigin && (
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
      )}

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
