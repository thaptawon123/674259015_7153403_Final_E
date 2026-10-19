import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const AlertMessage = ({ type = 'success', message, onClose, autoCloseDuration = 4000 }) => {
  useEffect(() => {
    if (!message || autoCloseDuration <= 0) return;
    const timer = setTimeout(() => {
      onClose();
    }, autoCloseDuration);
    return () => clearTimeout(timer);
  }, [message, autoCloseDuration, onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div className={`alert-banner ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
      <div className="alert-content">
        {isSuccess ? (
          <CheckCircle2 size={20} className="alert-icon" />
        ) : (
          <AlertCircle size={20} className="alert-icon" />
        )}
        <span className="alert-text">{message}</span>
      </div>
      <button type="button" className="alert-close-btn" onClick={onClose} title="ปิดการแจ้งเตือน">
        <X size={16} />
      </button>
    </div>
  );
};

export default AlertMessage;
