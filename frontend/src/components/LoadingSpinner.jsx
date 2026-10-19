import React from 'react';

const LoadingSpinner = ({ text = 'กำลังโหลดข้อมูล...' }) => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner"></div>
      {text && <span className="spinner-text">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;
