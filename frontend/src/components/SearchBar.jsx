import React from 'react';
import { Search, RotateCcw, Plus, Filter } from 'lucide-react';

const CATEGORIES = ['บทความ', 'วิดีโอ', 'แบบฝึกหัด'];

const SearchBar = ({
  keyword,
  setKeyword,
  category,
  setCategory,
  onSearch,
  onReset,
  onOpenAddModal
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const hasFilter = keyword.trim().length > 0 || category !== '';

  return (
    <div className="searchbar-card">
      <div className="searchbar-grid">
        {/* Keyword Search */}
        <div className="search-input-group">
          <label htmlFor="search-keyword" className="filter-label">ค้นหาจากชื่อ / หัวข้อ</label>
          <div className="input-with-icon">
            <Search className="field-icon" size={18} />
            <input
              id="search-keyword"
              type="text"
              className="text-input"
              placeholder="พิมพ์ชื่อสื่อการเรียนรู้..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="search-input-group">
          <label htmlFor="search-category" className="filter-label">หมวดหมู่</label>
          <div className="input-with-icon">
            <Filter className="field-icon" size={18} />
            <select
              id="search-category"
              className="select-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">ทั้งหมดทุกหมวดหมู่</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="search-actions-group">
          <div className="filter-buttons-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSearch}
              title="ค้นหาตามเงื่อนไข"
            >
              <Search size={16} />
              <span>ค้นหา</span>
            </button>

            {hasFilter && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onReset}
                title="ล้างเงื่อนไขทั้งหมด"
              >
                <RotateCcw size={16} />
                <span>ล้างเงื่อนไข</span>
              </button>
            )}
          </div>

          <button
            type="button"
            className="btn btn-success"
            onClick={onOpenAddModal}
          >
            <Plus size={18} />
            <span>เพิ่มสื่อการเรียนรู้</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
