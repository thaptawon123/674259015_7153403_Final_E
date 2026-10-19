import React from 'react';
import { X, Calendar, User, Tag, CheckCircle2, Clock, FileText, Info } from 'lucide-react';

const ResourceDetailModal = ({ isOpen, resource, onClose }) => {
  if (!isOpen || !resource) return null;

  const isPublished = Boolean(resource.status);

  const formatDateTime = (dateStr) => {
    if (!dateStr) return '-';
    try {
      const d = new Date(dateStr);
      return d.toLocaleString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-with-badge">
            <h2 className="modal-title">รายละเอียดสื่อการเรียนรู้ #{resource.id}</h2>
            <span className={`badge ${isPublished ? 'badge-status-published' : 'badge-status-draft'}`}>
              <span className={`status-dot ${isPublished ? 'dot-published' : 'dot-draft'}`}></span>
              {isPublished ? 'เผยแพร่แล้ว' : 'ฉบับร่าง'}
            </span>
          </div>
          <button type="button" className="btn-close" onClick={onClose} title="ปิดหน้าต่าง">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body detail-modal-body">
          <div className="detail-hero">
            <h3 className="detail-resource-title">{resource.title}</h3>
          </div>

          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">
                <User size={16} className="detail-icon" />
                <span>ผู้สร้าง (Creator):</span>
              </div>
              <div className="detail-value">{resource.creator}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">
                <Tag size={16} className="detail-icon" />
                <span>หมวดหมู่ (Category):</span>
              </div>
              <div className="detail-value">
                <span className="badge badge-category-default">{resource.category}</span>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-label">
                <Calendar size={16} className="detail-icon" />
                <span>วันที่เผยแพร่ (Published Date):</span>
              </div>
              <div className="detail-value">{resource.publishedDate}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">
                <CheckCircle2 size={16} className="detail-icon" />
                <span>สถานะ (Status):</span>
              </div>
              <div className="detail-value">
                {isPublished ? 'เผยแพร่สู่สาธารณะ' : 'บันทึกเป็นฉบับร่าง'}
              </div>
            </div>
          </div>

          <div className="detail-description-section">
            <div className="detail-label">
              <FileText size={16} className="detail-icon" />
              <span>รายละเอียดเนื้อหา (Description):</span>
            </div>
            <div className="detail-description-content">
              {resource.description}
            </div>
          </div>

          <div className="detail-timestamps">
            <div className="timestamp-item">
              <Clock size={14} className="timestamp-icon" />
              <span>สร้างเมื่อ: {formatDateTime(resource.createdAt)}</span>
            </div>
            <div className="timestamp-item">
              <Clock size={14} className="timestamp-icon" />
              <span>ปรับปรุงล่าสุด: {formatDateTime(resource.updatedAt)}</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetailModal;
