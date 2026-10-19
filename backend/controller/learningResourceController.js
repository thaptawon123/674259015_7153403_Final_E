const { Op } = require('sequelize');
const sequelize = require('../config/db');
const { LearningResource, ALLOWED_CATEGORIES } = require('../model/learningResource');

// Helper to validate positive integer ID (strictly positive digits)
const isValidPositiveInteger = (val) => {
  if (val === null || val === undefined) return false;
  const str = String(val).trim();
  if (!/^\d+$/.test(str)) return false;
  const num = parseInt(str, 10);
  return num > 0;
};

// Helper to validate calendar date format (YYYY-MM-DD)
const isValidDateFormat = (dateString) => {
  if (typeof dateString !== 'string') return false;
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  const [year, month, day] = dateString.split('-').map(Number);
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return false;
  return d.getUTCFullYear() === year && (d.getUTCMonth() + 1) === month && d.getUTCDate() === day;
};

// GET /api/learning-resources
// Read list, search by partial title, filter by category
const getAllLearningResources = async (req, res) => {
  try {
    // Support query parameters: keyword, search, title, or q
    const rawSearch = req.query.keyword || req.query.search || req.query.title || req.query.q;
    const category = req.query.category;
    const whereConditions = {};

    // Search partial title
    if (rawSearch && typeof rawSearch === 'string' && rawSearch.trim().length > 0) {
      const searchKeyword = `%${rawSearch.trim()}%`;
      const isPostgres = sequelize.getDialect() === 'postgres';
      const searchOp = isPostgres ? Op.iLike : Op.like;
      whereConditions.title = {
        [searchOp]: searchKeyword
      };
    }

    // Filter by category
    if (category && typeof category === 'string' && category.trim().length > 0) {
      whereConditions.category = category.trim();
    }

    const resources = await LearningResource.findAll({
      where: whereConditions,
      order: [['id', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      total: resources.length,
      data: resources,
      message: resources.length === 0 ? 'ไม่พบข้อมูลสื่อการเรียนรู้ตามเงื่อนไขที่ระบุ' : undefined
    });
  } catch (error) {
    console.error('Error fetching learning resources:', error.message);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดภายในระบบ ไม่สามารถดึงข้อมูลได้'
    });
  }
};

// GET /api/learning-resources/:id
// Read single resource
const getLearningResourceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidPositiveInteger(id)) {
      return res.status(400).json({
        success: false,
        message: 'รหัสสื่อการเรียนรู้ (ID) ต้องเป็นจำนวนเต็มบวกเท่านั้น'
      });
    }

    const resource = await LearningResource.findByPk(id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: `ไม่พบข้อมูลสื่อการเรียนรู้รหัส ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      data: resource
    });
  } catch (error) {
    console.error('Error fetching learning resource by ID:', error.message);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดภายในระบบ'
    });
  }
};

// POST /api/learning-resources
// Create a new learning resource
const createLearningResource = async (req, res) => {
  try {
    const { title, creator, category, publishedDate, description, status } = req.body;
    const errors = [];

    // Title validation (1-150 chars, no empty/whitespace-only)
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      errors.push('กรุณาระบุชื่อสื่อการเรียนรู้ และต้องไม่เป็นช่องว่างล้วน');
    } else if (title.trim().length > 150) {
      errors.push('ชื่อสื่อการเรียนรู้ต้องมีความยาว 1-150 ตัวอักษร');
    }

    // Creator validation (1-100 chars, no empty/whitespace-only)
    if (!creator || typeof creator !== 'string' || creator.trim().length === 0) {
      errors.push('กรุณาระบุชื่อผู้สร้าง และต้องไม่เป็นช่องว่างล้วน');
    } else if (creator.trim().length > 100) {
      errors.push('ชื่อผู้สร้างต้องมีความยาว 1-100 ตัวอักษร');
    }

    // Category validation (must be in ALLOWED_CATEGORIES: บทความ, วิดีโอ, แบบฝึกหัด)
    if (!category || typeof category !== 'string' || !ALLOWED_CATEGORIES.includes(category.trim())) {
      errors.push(`หมวดหมู่ไม่ถูกต้อง ต้องเลือกจาก: ${ALLOWED_CATEGORIES.join(', ')}`);
    }

    // PublishedDate validation (valid YYYY-MM-DD date)
    if (!publishedDate || !isValidDateFormat(publishedDate)) {
      errors.push('วันที่เผยแพร่ไม่ถูกต้อง ต้องอยู่ในรูปแบบ YYYY-MM-DD');
    }

    // Description validation (1-2000 chars, no empty/whitespace-only)
    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      errors.push('กรุณาระบุรายละเอียด และต้องไม่เป็นช่องว่างล้วน');
    } else if (description.trim().length > 2000) {
      errors.push('รายละเอียดต้องมีความยาว 1-2,000 ตัวอักษร');
    }

    // Status validation (optional, default true)
    let parsedStatus = true;
    if (status !== undefined) {
      if (typeof status === 'boolean') {
        parsedStatus = status;
      } else if (status === 'true' || status === 1 || status === '1') {
        parsedStatus = true;
      } else if (status === 'false' || status === 0 || status === '0') {
        parsedStatus = false;
      } else {
        errors.push('สถานะ (status) ต้องเป็นค่าจริง/เท็จ (Boolean) เท่านั้น');
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors[0],
        errors
      });
    }

    const newResource = await LearningResource.create({
      title: title.trim(),
      creator: creator.trim(),
      category: category.trim(),
      publishedDate,
      description: description.trim(),
      status: parsedStatus
    });

    return res.status(201).json({
      success: true,
      message: 'เพิ่มข้อมูลสื่อการเรียนรู้สำเร็จ',
      data: newResource
    });
  } catch (error) {
    console.error('Error creating learning resource:', error.message);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: error.errors[0]?.message || 'ข้อมูลไม่ผ่านเงื่อนไขที่กำหนด',
        errors: error.errors.map(e => e.message)
      });
    }
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดภายในระบบ ไม่สามารถบันทึกข้อมูลได้'
    });
  }
};

// PUT /api/learning-resources/:id
// Update learning resource
const updateLearningResource = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidPositiveInteger(id)) {
      return res.status(400).json({
        success: false,
        message: 'รหัสสื่อการเรียนรู้ (ID) ต้องเป็นจำนวนเต็มบวกเท่านั้น'
      });
    }

    const resource = await LearningResource.findByPk(id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: `ไม่พบข้อมูลสื่อการเรียนรู้รหัส ${id} ที่ต้องการแก้ไข`
      });
    }

    const { title, creator, category, publishedDate, description, status } = req.body;
    const errors = [];

    // Title validation
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      errors.push('กรุณาระบุชื่อสื่อการเรียนรู้ และต้องไม่เป็นช่องว่างล้วน');
    } else if (title.trim().length > 150) {
      errors.push('ชื่อสื่อการเรียนรู้ต้องมีความยาว 1-150 ตัวอักษร');
    }

    // Creator validation
    if (!creator || typeof creator !== 'string' || creator.trim().length === 0) {
      errors.push('กรุณาระบุชื่อผู้สร้าง และต้องไม่เป็นช่องว่างล้วน');
    } else if (creator.trim().length > 100) {
      errors.push('ชื่อผู้สร้างต้องมีความยาว 1-100 ตัวอักษร');
    }

    // Category validation
    if (!category || typeof category !== 'string' || !ALLOWED_CATEGORIES.includes(category.trim())) {
      errors.push(`หมวดหมู่ไม่ถูกต้อง ต้องเลือกจาก: ${ALLOWED_CATEGORIES.join(', ')}`);
    }

    // PublishedDate validation
    if (!publishedDate || !isValidDateFormat(publishedDate)) {
      errors.push('วันที่เผยแพร่ไม่ถูกต้อง ต้องอยู่ในรูปแบบ YYYY-MM-DD');
    }

    // Description validation
    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      errors.push('กรุณาระบุรายละเอียด และต้องไม่เป็นช่องว่างล้วน');
    } else if (description.trim().length > 2000) {
      errors.push('รายละเอียดต้องมีความยาว 1-2,000 ตัวอักษร');
    }

    // Status validation
    let parsedStatus = resource.status;
    if (status !== undefined) {
      if (typeof status === 'boolean') {
        parsedStatus = status;
      } else if (status === 'true' || status === 1 || status === '1') {
        parsedStatus = true;
      } else if (status === 'false' || status === 0 || status === '0') {
        parsedStatus = false;
      } else {
        errors.push('สถานะ (status) ต้องเป็นค่าจริง/เท็จ (Boolean) เท่านั้น');
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors[0],
        errors
      });
    }

    await resource.update({
      title: title.trim(),
      creator: creator.trim(),
      category: category.trim(),
      publishedDate,
      description: description.trim(),
      status: parsedStatus
    });

    return res.status(200).json({
      success: true,
      message: 'แก้ไขข้อมูลสื่อการเรียนรู้สำเร็จ',
      data: resource
    });
  } catch (error) {
    console.error('Error updating learning resource:', error.message);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: error.errors[0]?.message || 'ข้อมูลไม่ผ่านเงื่อนไขที่กำหนด',
        errors: error.errors.map(e => e.message)
      });
    }
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดภายในระบบ ไม่สามารถแก้ไขข้อมูลได้'
    });
  }
};

// DELETE /api/learning-resources/:id
// Delete learning resource
const deleteLearningResource = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidPositiveInteger(id)) {
      return res.status(400).json({
        success: false,
        message: 'รหัสสื่อการเรียนรู้ (ID) ต้องเป็นจำนวนเต็มบวกเท่านั้น'
      });
    }

    const resource = await LearningResource.findByPk(id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: `ไม่พบข้อมูลสื่อการเรียนรู้รหัส ${id} ที่ต้องการลบ`
      });
    }

    await resource.destroy();

    return res.status(200).json({
      success: true,
      message: `ลบสื่อการเรียนรู้ "${resource.title}" สำเร็จ`,
      data: { id: Number(id) }
    });
  } catch (error) {
    console.error('Error deleting learning resource:', error.message);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดภายในระบบ ไม่สามารถลบข้อมูลได้'
    });
  }
};

module.exports = {
  getAllLearningResources,
  getLearningResourceById,
  createLearningResource,
  updateLearningResource,
  deleteLearningResource
};
