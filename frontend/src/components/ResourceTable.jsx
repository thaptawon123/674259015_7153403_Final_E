import React from 'react';
import { Eye, Edit2, Trash2, FileText, Video, BookOpen, AlertCircle } from 'lucide-react';

const CategoryBadge = ({ category }) => {
  let badgeClass = 'badge-category-default';
  let Icon = BookOpen;

  if (category === 'บทความ') {
    badgeClass = 'badge-category-article';
    Icon = FileText;
  } else if (category === 'วิดีโอ') {
    badgeClass = 'badge-category-video';
    Icon = Video;
  } else if (category === 'แบบฝึกหัด') {
    badgeClass = 'badge-category-exercise';
    Icon = BookOpen;
  }

  return (
    <span className={`badge ${badgeClass}`}>
      <Icon size={13} className="badge-icon" />
      {category}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const isPublished = Boolean(status);
  return (
    <span className={`badge ${isPublished ? 'badge-status-published' : 'badge-status-draft'}`}>
      <span className={`status-dot ${isPublished ? 'dot-published' : 'dot-draft'}`}></span>
      {isPublished ? 'เผยแพร่' : 'ฉบับร่าง'}
    </span>
  );
};

const ResourceTable = ({
  resources,
  loading,
  onView,
  onEdit,
  onDelete
}) => {
  if (loading) {
    return (
      <div className="table-card">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>กำลังโหลดข้อมูลสื่อการเรียนรู้...</p>
        </div>
      </div>
    );
  }

  if (!resources || resources.length === 0) {
    return (
      <div className="table-card">
        <div className="empty-state">
          <AlertCircle size={44} className="empty-icon" />
          <h3 className="empty-title">ไม่พบข้อมูลสื่อการเรียนรู้</h3>
          <p className="empty-desc">
            ไม่มีรายการที่ตรงกับเงื่อนไขการค้นหา หรือยังไม่มีข้อมูลในระบบ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-header-info">
        <span className="table-count-text">
          พบข้อมูลทั้งหมด <strong>{resources.length}</strong> รายการ
        </span>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th className="th-id">รหัส</th>
              <th className="th-title">ชื่อสื่อการเรียนรู้</th>
              <th className="th-creator">ผู้สร้าง</th>
              <th className="th-category">หมวดหมู่</th>
              <th className="th-date">วันที่เผยแพร่</th>
              <th className="th-status">สถานะ</th>
              <th className="th-actions">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((item) => (
              <tr key={item.id} className="table-row">
                <td className="td-id">#{item.id}</td>
                <td className="td-title">
                  <div className="title-text" title={item.title}>
                    {item.title}
                  </div>
                </td>
                <td className="td-creator">{item.creator}</td>
                <td className="td-category">
                  <CategoryBadge category={item.category} />
                </td>
                <td className="td-date">{item.publishedDate}</td>
                <td className="td-status">
                  <StatusBadge status={item.status} />
                </td>
                <td className="td-actions">
                  <div className="action-buttons-group">
                    <button
                      type="button"
                      className="btn-icon btn-icon-view"
                      onClick={() => onView(item)}
                      title="ดูรายละเอียด"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      className="btn-icon btn-icon-edit"
                      onClick={() => onEdit(item)}
                      title="แก้ไขข้อมูล"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      type="button"
                      className="btn-icon btn-icon-delete"
                      onClick={() => onDelete(item)}
                      title="ลบข้อมูล"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResourceTable;
