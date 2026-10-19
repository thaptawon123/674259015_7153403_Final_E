import React, { useState, useEffect } from 'react';
import { X, Save, AlertTriangle } from 'lucide-react';

const CATEGORIES = ['บทความ', 'วิดีโอ', 'แบบฝึกหัด'];

const initialFormData = {
  title: '',
  creator: '',
  category: 'บทความ',
  publishedDate: new Date().toISOString().split('T')[0],
  description: '',
  status: true
};

const ResourceFormModal = ({
  isOpen,
  mode = 'add', // 'add' or 'edit'
  initialData = null,
  onClose,
  onSubmit,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        title: initialData.title || '',
        creator: initialData.creator || '',
        category: initialData.category || 'บทความ',
        publishedDate: initialData.publishedDate || new Date().toISOString().split('T')[0],
        description: initialData.description || '',
        status: initialData.status !== undefined ? Boolean(initialData.status) : true
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [initialData, mode, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title || formData.title.trim().length === 0) {
      newErrors.title = 'กรุณาระบุชื่อสื่อการเรียนรู้ (ห้ามเป็นช่องว่างล้วน)';
    } else if (formData.title.trim().length > 150) {
      newErrors.title = 'ชื่อสื่อการเรียนรู้ต้องไม่เกิน 150 ตัวอักษร';
    }

    // Creator validation
    if (!formData.creator || formData.creator.trim().length === 0) {
      newErrors.creator = 'กรุณาระบุชื่อผู้สร้าง (ห้ามเป็นช่องว่างล้วน)';
    } else if (formData.creator.trim().length > 100) {
      newErrors.creator = 'ชื่อผู้สร้างต้องไม่เกิน 100 ตัวอักษร';
    }

    // Category validation
    if (!formData.category || !CATEGORIES.includes(formData.category)) {
      newErrors.category = 'กรุณาเลือกหมวดหมู่ที่ถูกต้อง';
    }

    // PublishedDate validation
    if (!formData.publishedDate) {
      newErrors.publishedDate = 'กรุณาระบุวันที่เผยแพร่';
    } else {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(formData.publishedDate)) {
        newErrors.publishedDate = 'รูปแบบวันที่ต้องเป็น YYYY-MM-DD';
      }
    }

    // Description validation
    if (!formData.description || formData.description.trim().length === 0) {
      newErrors.description = 'กรุณาระบุรายละเอียด (ห้ามเป็นช่องว่างล้วน)';
    } else if (formData.description.trim().length > 2000) {
      newErrors.description = 'รายละเอียดต้องไม่เกิน 2,000 ตัวอักษร';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: formData.title.trim(),
      creator: formData.creator.trim(),
      category: formData.category,
      publishedDate: formData.publishedDate,
      description: formData.description.trim(),
      status: formData.status
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {mode === 'edit' ? 'แก้ไขสื่อการเรียนรู้' : 'เพิ่มสื่อการเรียนรู้ใหม่'}
          </h2>
          <button type="button" className="btn-close" onClick={onClose} title="ปิดหน้าต่าง">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            {/* Title field */}
            <div className="form-group">
              <label htmlFor="form-title" className="form-label required">
                ชื่อสื่อการเรียนรู้ (Title) <span className="char-count">({formData.title.length}/150)</span>
              </label>
              <input
                id="form-title"
                type="text"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                placeholder="เช่น คู่มือการใช้งาน Node.js เบื้องต้น"
                maxLength={150}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              {errors.title && <span className="invalid-feedback">{errors.title}</span>}
            </div>

            {/* Creator and Category in 2-column grid */}
            <div className="form-row">
              <div className="form-group col-half">
                <label htmlFor="form-creator" className="form-label required">
                  ผู้สร้าง (Creator) <span className="char-count">({formData.creator.length}/100)</span>
                </label>
                <input
                  id="form-creator"
                  type="text"
                  className={`form-control ${errors.creator ? 'is-invalid' : ''}`}
                  placeholder="เช่น ทับตะวัน งามดี"
                  maxLength={100}
                  value={formData.creator}
                  onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
                />
                {errors.creator && <span className="invalid-feedback">{errors.creator}</span>}
              </div>

              <div className="form-group col-half">
                <label htmlFor="form-category" className="form-label required">
                  หมวดหมู่ (Category)
                </label>
                <select
                  id="form-category"
                  className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && <span className="invalid-feedback">{errors.category}</span>}
              </div>
            </div>

            {/* PublishedDate and Status */}
            <div className="form-row">
              <div className="form-group col-half">
                <label htmlFor="form-published-date" className="form-label required">
                  วันที่เผยแพร่ (Published Date)
                </label>
                <input
                  id="form-published-date"
                  type="date"
                  className={`form-control ${errors.publishedDate ? 'is-invalid' : ''}`}
                  value={formData.publishedDate}
                  onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                />
                {errors.publishedDate && (
                  <span className="invalid-feedback">{errors.publishedDate}</span>
                )}
              </div>

              <div className="form-group col-half">
                <label className="form-label required">สถานะการแสดงผล (Status)</label>
                <div className="status-radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="status"
                      checked={formData.status === true}
                      onChange={() => setFormData({ ...formData, status: true })}
                    />
                    <span className="radio-custom"></span>
                    <span className="radio-text">เผยแพร่ (Published)</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="status"
                      checked={formData.status === false}
                      onChange={() => setFormData({ ...formData, status: false })}
                    />
                    <span className="radio-custom"></span>
                    <span className="radio-text">ฉบับร่าง (Draft)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="form-description" className="form-label required">
                รายละเอียด (Description) <span className="char-count">({formData.description.length}/2000)</span>
              </label>
              <textarea
                id="form-description"
                rows={4}
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                placeholder="ระบุเนื้อหา คำอธิบาย หรือบทคัดย่อของสื่อการเรียนรู้นี้..."
                maxLength={2000}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {errors.description && (
                <span className="invalid-feedback">{errors.description}</span>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              <Save size={16} />
              <span>{isSubmitting ? 'กำลังบันทึก...' : (mode === 'edit' ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูล')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceFormModal;
