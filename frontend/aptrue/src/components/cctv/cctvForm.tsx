'use client';
import { useRecoilState } from 'recoil';
import { cctvFormState } from '@/state/atoms/cctvAtoms';
import style from './cctvForm.module.scss';
import GeneralInput from '../common/input/GeneralInput';
import { useState } from 'react';
import TimeInput from '../common/input/TimeInput';

export default function CCTVForm() {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const handleInputName = (inputValue: string) => {
    setName(inputValue);
    // 추가적인 동작, 예: 서버 요청이나 실시간 검증
  };
  const handleInputPhone = (inputValue: string) => {
    setPhone(inputValue);
    // 추가적인 동작, 예: 서버 요청이나 실시간 검증
  };
  const handleInputEmail = (inputValue: string) => {
    setEmail(inputValue);
    // 추가적인 동작, 예: 서버 요청이나 실시간 검증
  };
  const handleInputAddress = (inputValue: string) => {
    setAddress(inputValue);
    // 추가적인 동작, 예: 서버 요청이나 실시간 검증
  };
  const handleInputPassword = (inputValue: string) => {
    setPassword(inputValue);
    // 추가적인 동작, 예: 서버 요청이나 실시간 검증
  };
  const handleInputTime = (inputValue: string) => {
    setStartDate(inputValue);
    setEndDate(inputValue);
    // 추가적인 동작, 예: 서버 요청이나 실시간 검증
  };
  return (
    <div className={style['cctv-form-container']}>
      <div className={style.header}>CCTV 열람 요청</div>
      <div className={style['input-container']}>
        <div className="name, phone">
          <GeneralInput
            label="이름"
            placeholder="홍길동"
            size="short"
            onChange={handleInputName}
          />
          <GeneralInput
            label="전화번호"
            placeholder="010-0000-0000"
            size="short"
            onChange={handleInputPhone}
          />
        </div>
        <div className="email, address">
          <GeneralInput
            label="이메일"
            placeholder="xxxx1234@gmail.com"
            size="short"
            onChange={handleInputEmail}
          />
          <GeneralInput
            label="주소"
            placeholder="101동 101호"
            size="short"
            onChange={handleInputAddress}
          />
        </div>
        <div className="password">
          <GeneralInput
            label="비밀 번호"
            placeholder="대문자, 특수문자, 숫자를 포함한 8자 이상"
            size="long"
            onChange={handleInputPassword}
          />
        </div>
        <div className="requestTime">
          <TimeInput onChange={handleInputTime} isWeb={true} />
        </div>
        <div className="requestLocation"></div>
      </div>
    </div>
  );
}
