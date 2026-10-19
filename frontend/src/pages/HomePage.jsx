import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ResourceTable from '../components/ResourceTable';
import ResourceFormModal from '../components/ResourceFormModal';
import ResourceDetailModal from '../components/ResourceDetailModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import AlertMessage from '../components/AlertMessage';
import learningResourceService from '../services/learningResourceService';

const HomePage = () => {
  // State for data
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Search & Filter state
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [currentResource, setCurrentResource] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Action pending state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch list of resources from API
  const fetchResources = useCallback(async (searchWord = keyword, filterCat = category) => {
    setLoading(true);
    try {
      const data = await learningResourceService.getAll(searchWord, filterCat);
      setResources(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error loading resources:', err);
      const errMsg = err.response?.data?.message || 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ Backend ได้ กรุณาตรวจสอบการตั้งค่า API';
      setAlert({
        type: 'danger',
        message: errMsg
      });
      setResources([]);
    } finally {
      setLoading(false);
    }
  }, [keyword, category]);

  // Initial fetch
  useEffect(() => {
    fetchResources('', '');
  }, []);

  // Handle Search button
  const handleSearch = () => {
    fetchResources(keyword, category);
  };

  // Handle Reset filters
  const handleReset = () => {
    setKeyword('');
    setCategory('');
    fetchResources('', '');
  };

  // Open Add modal
  const handleOpenAddModal = () => {
    setCurrentResource(null);
    setFormMode('add');
    setIsFormModalOpen(true);
  };

  // Open Edit modal
  const handleOpenEditModal = (resource) => {
    setCurrentResource(resource);
    setFormMode('edit');
    setIsFormModalOpen(true);
  };

  // Open Detail modal
  const handleOpenDetailModal = (resource) => {
    setCurrentResource(resource);
    setIsDetailModalOpen(true);
  };

  // Open Delete confirmation modal
  const handleOpenDeleteModal = (resource) => {
    setDeleteTarget(resource);
    setIsDeleteModalOpen(true);
  };

  // Submit Form (Add or Edit)
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (formMode === 'edit' && currentResource) {
        const response = await learningResourceService.update(currentResource.id, formData);
        setAlert({
          type: 'success',
          message: response?.message || 'แก้ไขข้อมูลสื่อการเรียนรู้สำเร็จ'
        });
      } else {
        const response = await learningResourceService.create(formData);
        setAlert({
          type: 'success',
          message: response?.message || 'เพิ่มข้อมูลสื่อการเรียนรู้ใหม่สำเร็จ'
        });
      }
      setIsFormModalOpen(false);
      // Refresh list to show updated data
      fetchResources(keyword, category);
    } catch (err) {
      console.error('Error submitting form:', err);
      const errMsg = err.response?.data?.message || 'บันทึกข้อมูลไม่สำเร็จ กรุณาตรวจสอบข้อมูลและลองอีกครั้ง';
      setAlert({
        type: 'danger',
        message: errMsg
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Confirm Delete
  const handleConfirmDelete = async (id) => {
    setIsDeleting(true);
    try {
      const response = await learningResourceService.remove(id);
      setAlert({
        type: 'success',
        message: response?.message || 'ลบข้อมูลสื่อการเรียนรู้สำเร็จ'
      });
      setIsDeleteModalOpen(false);
      setDeleteTarget(null);
      // Refresh list
      fetchResources(keyword, category);
    } catch (err) {
      console.error('Error deleting resource:', err);
      const errMsg = err.response?.data?.message || 'ไม่สามารถลบข้อมูลได้ กรุณาลองใหม่อีกครั้ง';
      setAlert({
        type: 'danger',
        message: errMsg
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <div className="container">
          {alert && (
            <AlertMessage
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}

          {/* Search, Filter & Action Bar */}
          <SearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            category={category}
            setCategory={setCategory}
            onSearch={handleSearch}
            onReset={handleReset}
            onOpenAddModal={handleOpenAddModal}
          />

          {/* Data Table */}
          <ResourceTable
            resources={resources}
            loading={loading}
            onView={handleOpenDetailModal}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container footer-content">
          <span>7153403 การพัฒนาเว็บเซอร์วิส | มหาวิทยาลัยราชภัฏนครปฐม</span>
          <span>พัฒนาโดย นายทับตะวัน งามดี (รหัส 674259015) กลุ่มที่ 5 ชุด E</span>
        </div>
      </footer>

      {/* Add / Edit Form Modal */}
      <ResourceFormModal
        isOpen={isFormModalOpen}
        mode={formMode}
        initialData={currentResource}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />

      {/* View Detail Modal */}
      <ResourceDetailModal
        isOpen={isDetailModalOpen}
        resource={currentResource}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        resource={deleteTarget}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default HomePage;
