const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Allowed categories for Group 5 (Set E)
const ALLOWED_CATEGORIES = ['บทความ', 'วิดีโอ', 'แบบฝึกหัด'];

const LearningResource = sequelize.define('LearningResource', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'กรุณาระบุชื่อสื่อการเรียนรู้ (title)'
      },
      notEmpty: {
        msg: 'ชื่อสื่อการเรียนรู้ต้องไม่ว่างเปล่า'
      },
      len: {
        args: [1, 150],
        msg: 'ชื่อสื่อการเรียนรู้ต้องมีความยาว 1-150 ตัวอักษร'
      },
      notOnlyWhitespace(value) {
        if (!value || value.trim().length === 0) {
          throw new Error('ชื่อสื่อการเรียนรู้ต้องไม่เป็นเฉพาะช่องว่าง');
        }
      }
    }
  },
  creator: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'กรุณาระบุชื่อผู้สร้าง (creator)'
      },
      notEmpty: {
        msg: 'ชื่อผู้สร้างต้องไม่ว่างเปล่า'
      },
      len: {
        args: [1, 100],
        msg: 'ชื่อผู้สร้างต้องมีความยาว 1-100 ตัวอักษร'
      },
      notOnlyWhitespace(value) {
        if (!value || value.trim().length === 0) {
          throw new Error('ชื่อผู้สร้างต้องไม่เป็นเฉพาะช่องว่าง');
        }
      }
    }
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'กรุณาระบุหมวดหมู่ (category)'
      },
      isIn: {
        args: [ALLOWED_CATEGORIES],
        msg: `หมวดหมู่ต้องเป็นหนึ่งใน: ${ALLOWED_CATEGORIES.join(', ')}`
      }
    }
  },
  publishedDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'กรุณาระบุวันที่เผยแพร่ (publishedDate)'
      },
      isDate: {
        msg: 'รูปแบบวันที่เผยแพร่ไม่ถูกต้อง (ต้องเป็นรูปแบบ YYYY-MM-DD)'
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'กรุณาระบุรายละเอียด (description)'
      },
      notEmpty: {
        msg: 'รายละเอียดต้องไม่ว่างเปล่า'
      },
      len: {
        args: [1, 2000],
        msg: 'รายละเอียดต้องมีความยาว 1-2,000 ตัวอักษร'
      },
      notOnlyWhitespace(value) {
        if (!value || value.trim().length === 0) {
          throw new Error('รายละเอียดต้องไม่เป็นเฉพาะช่องว่าง');
        }
      }
    }
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
}, {
  tableName: 'learning_resources',
  timestamps: true // generates createdAt and updatedAt automatically
});

module.exports = {
  LearningResource,
  ALLOWED_CATEGORIES
};
