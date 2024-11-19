'use client';

import { useEffect, useState } from 'react';
import AlarmCard from './AlarmCard';
import Dropdown from './Dropdown';
import style from './Notification.module.scss';
import Emergency from './Emergency';
import { useRecoilValue } from 'recoil';
import { detectionState } from '@/state/atoms/detection';

interface SSE {
  name: string;
  clipRQId: number;
  message: string;
  createdAt: string;
}

const data: Alarm[] = [
  {
    notificationId: 1,
    message: '101동 주변 화재 발생',
    category: '화재',
    emergency: true,
    isCompleted: true,
    date: '2024-11-01T10:00:00',
    image: '/images/cctv_fire.png',
  },
  {
    notificationId: 2,
    message: '101동 주차장 불법 주차 발생',
    category: '불법 주차',
    emergency: false,
    isCompleted: true,
    date: '2024-10-31T15:30:00',
    image: '/images/park_cctv.png',
  },
  {
    notificationId: 3,
    message: '차은우님의 CCTV 요청 처리 완료',
    category: 'cctv 요청 처리',
    emergency: false,
    isCompleted: true,
    date: '2024-10-30T22:00:00',
    image: null,
  },
];

const LOCAL_STORAGE_KEY = 'recoil-persist';

// const initialData: SSE[] = JSON.parse(
//   localStorage.getItem(LOCAL_STORAGE_KEY) || '[]',
// );

export default function Notification() {
  const [selectedFilter, setSelectedFilter] = useState<string>('전체');
  const [sseData, setSseData] = useState<SSE[]>([]); // 초기 알림 데이터
  const [alarms, setAlarms] = useState<Alarm[]>([]); // 알람 데이터
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] =
    useState<boolean>(false);
  const [selectedAlarm, setSelectedAlarm] = useState<Alarm | null>(null);
  // const [detectionList, setDetectionList] = useState<any[]>([]);
  const detectionList = useRecoilValue(detectionState);

  // useEffect(() => {
  //   const eventSource = new EventSource(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/connect`,
  //   );

  //   eventSource.onmessage = (event) => {
  //     console.log(event);
  //     const newAlarm = JSON.parse(event.data);
  //     console.log('new alarm', newAlarm);
  //     setSseData((prevData) => {
  //       const updatedData = [newAlarm, ...prevData];
  //       // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
  //       return updatedData;
  //     });
  //   };
  // }, []);

  // const getDetectionStateFromLocalStorage = () => {
  //   const persistedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  //   if (persistedData) {
  //     const parsedData = JSON.parse(persistedData);
  //     return parsedData.detectionState || []; // detectionState가 없으면 빈 배열 반환
  //   }
  //   return []; // localStorage에 값이 없을 경우 빈 배열 반환
  // };

  // useEffect(() => {
  //   // localStorage에서 detectionList 초기화
  //   const storedDetectionState = getDetectionStateFromLocalStorage();
  //   setDetectionList(storedDetectionState);
  // }, []);

  useEffect(() => {
    // const detectionState = getDetectionStateFromLocalStorage();
    const formattedAlarms = detectionList.map((item: any, index: number) => ({
      notificationId: data.length + index + 1, // ID는 기존 알람 이후로 설정
      message: `${item.activeZone} ${item.category} 발생`,
      category: item.category,
      emergency: item.category === '화재',
      isCompleted: false,
      date: item.timestamp,
      image: item.image || null,
    }));

    // 기존 알람과 detectionState 기반 알람 병합 후 시간 순 정렬
    const allAlarms = [...data, ...formattedAlarms].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(), // 최신순 정렬
    );

    setAlarms(allAlarms);
  }, [detectionList]);

  // // 기존 알람 + detectionState 병합
  // const updateAlarms = () => {
  //   const detectionState = getDetectionStateFromLocalStorage();
  //   const formattedAlarms = detectionState.map((item: any, index: number) => ({
  //     notificationId: alarms.length + index + 1, // 고유 ID
  //     message: `${item.activeZone} ${item.category} 발생`,
  //     category: item.category,
  //     emergency: item.category === '화재',
  //     isCompleted: false,
  //     date: item.timestamp,
  //     image: item.image || null,
  //   }));

  //   const allAlarms = [...data, ...formattedAlarms].sort(
  //     (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(), // 최신순 정렬
  //   );

  //   setAlarms(allAlarms);
  // };

  // useEffect(() => {
  //   updateAlarms();
  // }, []);

  // useEffect(() => {
  //   updateAlarms();
  // }, [detectionList]); // detectionList가 변경될 때마다 알람 상태를 갱신

  const filteredData = alarms.filter((alarm) => {
    if (selectedFilter === '전체') return true;
    if (selectedFilter === '미완료') return !alarm.isCompleted;
    if (selectedFilter === '완료') return alarm.isCompleted;
    if (selectedFilter === '긴급') return alarm.emergency;
    return true;
  });

  const handleAlarmClick = (alarm: Alarm) => {
    if (alarm.emergency) {
      setSelectedAlarm(alarm);
      setIsEmergencyModalOpen(true);
    } else {
      console.log(`${alarm.message} 클릭됨`);
    }
  };

  const closeModal = () => {
    setIsEmergencyModalOpen(false);
    setSelectedAlarm(null);
  };

  function EmergencyModal({
    children,
    onClose,
  }: {
    children: React.ReactNode;
    onClose: () => void;
  }) {
    const handleBackdropClick = (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    };

    return (
      <div className={style.modalBackdrop} onClick={handleBackdropClick}>
        <div className={style.modalContent}>
          <img
            src="/icons/xbutton.png"
            alt="닫기 버튼"
            onClick={onClose}
            className={style.xbutton} // 스타일 적용
          />
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.titlecontainer}>
        <div className={style.title}>
          알림
          <span className={style.count}> {filteredData.length}</span>
        </div>
        <Dropdown setSelectedFilter={setSelectedFilter} />
      </div>
      {filteredData.map((alarm) => (
        <AlarmCard
          key={alarm.notificationId}
          {...alarm}
          onClick={() => handleAlarmClick(alarm)}
        />
      ))}

      {isEmergencyModalOpen && selectedAlarm && (
        <EmergencyModal onClose={closeModal}>
          <Emergency alarm={selectedAlarm} />
        </EmergencyModal>
      )}
    </div>
  );
}
