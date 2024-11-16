import React, { useState } from 'react';
import Toast from './Toast';

interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error';
}

export const ToastContext = React.createContext<{
  addToast: (message: string, type: 'success' | 'error') => void;
} | null>(null);

const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now(); // 고유 ID 생성
    setToasts((prev) => [...prev, { id, message, type }]);

    // 3초 후 Toast 제거
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() =>
              setToasts((prev) => prev.filter((t) => t.id !== toast.id))
            }
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastContainer;
