require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const { LearningResource } = require('./model/learningResource');
const learningResourceRouter = require('./router/learningResourceRouter');
const seedDatabase = require('./seed');

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

// Middleware
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim()) 
  : '*';

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
  });
}

// Health check and root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: '7153403 Web Service Technology Final Exam - Group 5 API is running',
    student: 'ทับตะวัน งามดี (674259015)',
    resource: 'learning_resources',
    endpoints: {
      getAll: 'GET /api/learning-resources',
      getById: 'GET /api/learning-resources/:id',
      create: 'POST /api/learning-resources',
      update: 'PUT /api/learning-resources/:id',
      delete: 'DELETE /api/learning-resources/:id'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Register Resource Router
app.use('/api/learning-resources', learningResourceRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `เส้นทาง ${req.method} ${req.originalUrl} ไม่ถูกต้องหรือไม่พบในระบบ`
  });
});

// Global 500 Error Handler (does not expose sensitive internal error traces)
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'เกิดข้อผิดพลาดภายในระบบ กรุณาลองใหม่อีกครั้ง'
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ เชื่อมต่อฐานข้อมูลสำเร็จ (Database connection established)');

    // Sync database models
    await sequelize.sync();
    console.log('✓ ซิงค์โครงสร้างตาราง Sequelize สำเร็จ (Models synchronized)');

    // Auto-seed sample data if empty
    await seedDatabase();

    app.listen(PORT, HOST, () => {
      console.log(`✓ เซิร์ฟเวอร์ Backend เริ่มทำงานที่ http://${HOST}:${PORT}`);
      console.log(`✓ API Endpoint: http://${HOST}:${PORT}/api/learning-resources`);
    });
  } catch (error) {
    console.error('✗ ไม่สามารถเชื่อมต่อฐานข้อมูลหรือเริ่มเซิร์ฟเวอร์ได้:', error.message);
    // Still start server so Render health check or config can be debugged
    app.listen(PORT, HOST, () => {
      console.log(`! เซิร์ฟเวอร์เริ่มทำงานในโหมด Standby (รอการเชื่อมต่อฐานข้อมูล): http://${HOST}:${PORT}`);
    });
  }
};

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
