import React, { useEffect } from 'react';
import './Toast.css';

interface ToastProps {
  message: string;
  type: 'success' | 'error'; // 알림 유형 (성공/오류)
  onClose: () => void; // 알림 닫기 핸들러
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // 3초 후 알림 닫기
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      {/* 알림 메시지 */}
      {message}
    </div>
  );
};

export default Toast;
