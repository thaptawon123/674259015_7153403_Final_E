import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

const DeleteConfirmModal = ({
  isOpen,
  resource,
  onClose,
  onConfirm,
  isDeleting = false
}) => {
  if (!isOpen || !resource) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header modal-header-danger">
          <div className="danger-header-title">
            <AlertTriangle className="danger-icon" size={22} />
            <h2 className="modal-title">ยืนยันการลบข้อมูล</h2>
          </div>
          <button type="button" className="btn-close" onClick={onClose} title="ยกเลิก">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p className="delete-warning-text">
            คุณแน่ใจหรือไม่ว่าต้องการลบสื่อการเรียนรู้นี้?
          </p>
          <div className="delete-target-card">
            <div className="delete-target-id">รหัส: #{resource.id}</div>
            <div className="delete-target-title">"{resource.title}"</div>
            <div className="delete-target-meta">
              ผู้สร้าง: {resource.creator} | หมวดหมู่: {resource.category}
            </div>
          </div>
          <p className="delete-subtext">
            เมื่อลบแล้ว ข้อมูลนี้จะถูกนำออกจากฐานข้อมูลอย่างถาวรและไม่สามารถกู้คืนได้
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isDeleting}
          >
            ยกเลิก
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onConfirm(resource.id)}
            disabled={isDeleting}
          >
            <Trash2 size={16} />
            <span>{isDeleting ? 'กำลังลบ...' : 'ยืนยันการลบ'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
