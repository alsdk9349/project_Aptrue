'use client';
import { useRecoilState } from 'recoil';
import { cctvFormState } from '@/state/atoms/cctvAtoms';
import style from './cctvForm.module.scss';
import GeneralInput from '../common/input/GeneralInput';
import { useEffect, useState } from 'react';
import TimeInput from '../common/input/TimeInput';
import Button from '../common/button/Button';

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

export default function CCTVForm() {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [showDate, setShowDate] = useState<string>('');
  const [activeZone, setActiveZone] = useState<string>('101동 주변');
  const [activeSubmit, setActiveSubmit] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  // 유효성 검증 함수
  const isFormValid = () => {
    // 비밀번호 검증: 특수문자, 대문자, 숫자를 포함한 8자 이상
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // 이메일 검증: @ 포함
    const emailRegex = /@/;
    // 주소 검증: '숫자 + 동 + 공백 + 숫자 + 호' 형식
    const addressRegex = /^\d+동 \d+호$/;
    // 전화번호 검증: '010-0000-0000' 형식
    const phoneRegex = /^010-\d{4}-\d{4}$/;

    if (name.trim() === '') {
      setMessage('이름을 입력해 주세요.');
      return false;
    }
    if (!phoneRegex.test(phone)) {
      setMessage("전화번호는 '010-0000-0000' 형식으로 입력해 주세요.");
      return false;
    }
    if (!emailRegex.test(email)) {
      setMessage('유효한 이메일 주소를 입력해 주세요.');
      return false;
    }
    if (!addressRegex.test(address)) {
      setMessage("주소는 '101동 203호' 형식으로 입력해 주세요.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setMessage(
        '비밀번호는 특수문자, 대문자, 숫자를 포함한 8자 이상이어야 합니다.',
      );
      return false;
    }
    if (startDate.trim() === '' || endDate.trim() === '') {
      setMessage('시작 날짜와 종료 날짜를 선택해 주세요.');
      return false;
    }

    setMessage('제출이 가능합니다.'); // 모든 조건을 만족하면 에러 메시지를 비웁니다.
    return true;
  };

  // 입력 값이 변경될 때마다 activeSubmit 상태를 업데이트
  useEffect(() => {
    setActiveSubmit(isFormValid());
  }, [name, phone, email, address, password, startDate, endDate]);

  const reset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setPassword('');
    setStartDate('');
    setEndDate('');
    setShowDate('');
    setActiveSubmit(false);
  };

  const handleSubmitClick = () => {
    // setActiveSubmit((prev) => !prev); // 상태를 반전시킴
    reset();
  };

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    // 추가적인 동작, 예: 서버 요청이나 실시간 검증
  };
  const handleInputPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    // 추가적인 동작, 예: 서버 요청이나 실시간 검증
  };
  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // 추가적인 동작, 예: 서버 요청이나 실시간 검증
  };
  const handleInputAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    // 추가적인 동작, 예: 서버 요청이나 실시간 검증
  };
  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // 추가적인 동작, 예: 서버 요청이나 실시간 검증
  };

  const handleInputTime = (startDate: string, endDate: string) => {
    if (startDate && endDate) {
      const formattedStartDate = startDate.replace('T', ' ');
      const formattedEndDate = endDate.replace('T', ' ');
      setShowDate(`${formattedStartDate} - ${formattedEndDate}`);
    }
  };

  const handleButtonClick = (zone: string) => {
    // 이미 활성화된 버튼을 클릭하면 비활성화, 아니면 새 버튼 활성화
    if (activeZone === zone) {
      setActiveZone(''); // 비활성화 상태로 변경
    } else {
      setActiveZone(zone); // 클릭한 버튼을 활성화 상태로 설정
    }
  };

  return (
    <div className={style['cctv-form-container']}>
      <div className={style.header}>CCTV 열람 요청</div>
      <div className={style['input-container']}>
        <div className={style.double}>
          <GeneralInput
            label="이름"
            value={name}
            placeholder="홍길동"
            size="short"
            onChange={handleInputName}
          />
          <GeneralInput
            label="전화번호"
            value={phone}
            placeholder="010-0000-0000"
            size="short"
            onChange={handleInputPhone}
          />
        </div>
        <div className={style.double}>
          <GeneralInput
            label="이메일"
            value={email}
            placeholder="xxxx1234@gmail.com"
            size="short"
            onChange={handleInputEmail}
          />
          <GeneralInput
            label="주소"
            value={address}
            placeholder="101동 101호"
            size="short"
            onChange={handleInputAddress}
          />
        </div>
        <div className="password">
          <GeneralInput
            label="비밀 번호"
            value={password}
            placeholder="대문자, 특수문자, 숫자를 포함한 8자 이상"
            size="long"
            onChange={handleInputPassword}
          />
        </div>
        <div className="requestTime">
          <TimeInput
            isWeb={true}
            value={showDate}
            handleInputTime={handleInputTime}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div className={style['location-button-container']}>
          <div className={style.label}>
            {'요청위치'.split('').map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </div>
          <div className={style['location-button']}>
            {cctvZone.map((zone, index) => (
              <Button
                key={index}
                color={activeZone === zone ? 'blue' : 'white'} // 활성 상태에 따라 색상 변경
                size="webSmall"
                clickedColor="lightBlue"
                active={activeZone === zone} // active prop을 boolean으로 설정
                onClick={() => handleButtonClick(zone)} // 클릭 시 활성 상태 변경
              >
                {zone}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className={style.submit}>
        <div
          className={`${style.message} ${activeSubmit ? style.blue : style.red}`}
        >
          {message}
        </div>
        <div>
          <Button
            size="webRegular"
            color={activeSubmit ? 'blue' : 'gray'}
            onClick={handleSubmitClick}
            disabled={!activeSubmit}
          >
            제출
          </Button>
        </div>
      </div>
    </div>
  );
}
