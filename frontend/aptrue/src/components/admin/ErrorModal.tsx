"use client"

import { useEffect } from 'react';
import styles from './ErrorModal.module.scss';
import Draggable from 'react-draggable';


export default function ErrorModal({
    message,
    isOpen,
    onClose
}:{
    message:string;
    isOpen:boolean;
    onClose:()=>void;
}) {
    useEffect(()=>{

        if (!isOpen) return;

        // 15초 후에 모달을 닫는 타이머 설정
        const timer = setTimeout(()=>{
            onClose();
        }, 15000)

        // 컴포넌트가 언마운트되거나 isOpen이 변경될 때 타이머 정리
        return () => clearTimeout(timer);

    },[isOpen, onClose])

    if (!isOpen) return null;

    const handleStop = (e: any, data: any) => {

        if (data.x > 5) { // 오른쪽으로 5px 이상 드래그 시 모달 닫기
            onClose();
        }
    };

    return (

        <Draggable 
        axis="x" // 수평 드래그만 가능하게 설정
        bounds={{ left: 0, right: 100 }} // 왼쪽으로 드래그 불가능하게 제한
        defaultPosition={{ x: 0, y: 0 }}
        onStop={handleStop}
        >
            <div className={styles.container}>
                <div className={styles.leftLine}/>
                <div className={styles.content}>
                    {message}
                </div>
            </div>
        </Draggable>

    )
}