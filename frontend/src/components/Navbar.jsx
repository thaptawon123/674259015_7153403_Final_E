import React from 'react';
import { BookOpen, User, Sparkles } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <div className="brand-section">
          <div className="brand-icon-wrapper">
            <BookOpen className="brand-icon" size={26} />
          </div>
          <div>
            <div className="brand-title-row">
              <h1 className="brand-title">ระบบบริหารจัดการสื่อการเรียนรู้</h1>
              <span className="badge-group">กลุ่มที่ 5: สื่อการเรียนรู้ (Set E)</span>
            </div>
            <p className="brand-subtitle">รายวิชา 7153403 เทคโนโลยีการบริการเว็บ | ข้อสอบปลายภาค 1/2569</p>
          </div>
        </div>

        <div className="student-badge">
          <div className="student-icon">
            <User size={18} />
          </div>
          <div className="student-info">
            <span className="student-name">ทับตะวัน งามดี</span>
            <span className="student-id">รหัสนักศึกษา: 674259015</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
