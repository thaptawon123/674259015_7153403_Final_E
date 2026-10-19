const sequelize = require('./config/db');
const { LearningResource } = require('./model/learningResource');

const sampleResources = [
  {
    title: 'คู่มือการพัฒนา RESTful API ด้วย Node.js และ Express เบื้องต้น',
    creator: 'ทับตะวัน งามดี',
    category: 'บทความ',
    publishedDate: '2026-01-15',
    description: 'เรียนรู้หลักการออกแบบ RESTful API สถาปัตยกรรม Client-Server รหัสสถานะ HTTP Status Codes และการจัดการ Request/Response ใน Express',
    status: true
  },
  {
    title: 'สอนสร้าง Fullstack Web App ด้วย React และ Node.js ตอนที่ 1',
    creator: 'วรรษพจน์ ศรีพลอยรุ่ง',
    category: 'วิดีโอ',
    publishedDate: '2026-02-01',
    description: 'วิดีโอบรรยายภาพรวมการเชื่อมต่อระหว่าง Frontend React บน Vite กับ Backend Node.js และการแลกเปลี่ยนข้อมูลผ่าน JSON API',
    status: true
  },
  {
    title: 'แบบฝึกหัดการเขียน SQL Query และการใช้งาน Sequelize ORM',
    creator: 'จิรเมธ วงษ์กัณหา',
    category: 'แบบฝึกหัด',
    publishedDate: '2026-02-10',
    description: 'ชุดโจทย์แบบฝึกหัด 20 ข้อ สำหรับฝึกฝนการเขียนคำสั่ง CRUD, การค้นหาข้อมูลด้วยคำค้นหา และการกรองข้อมูลตามเงื่อนไขในฐานข้อมูลเชิงสัมพันธ์',
    status: true
  },
  {
    title: 'สถาปัตยกรรม Microservices กับระบบ Cloud Native ยุคใหม่',
    creator: 'สมหมาย สุภาวงค์',
    category: 'บทความ',
    publishedDate: '2026-03-05',
    description: 'เจาะลึกข้อดีและข้อจำกัดของการเปลี่ยนผ่านจาก Monolithic สู่ Microservices พร้อมแนวทางการจัดการ Service Discovery และ API Gateway',
    status: false
  },
  {
    title: 'วิดีโอสาธิตการ Deploy เว็บแอปพลิเคชันขึ้น Render และ Vercel',
    creator: 'ทับตะวัน งามดี',
    category: 'วิดีโอ',
    publishedDate: '2026-03-20',
    description: 'ขั้นตอนการนำโค้ดจาก GitHub ไปติดตั้งบน Production Cloud Services การตั้งค่า Environment Variables และการผูกโดเมนอย่างปลอดภัย',
    status: true
  },
  {
    title: 'แบบฝึกหัดการตรวจจับข้อผิดพลาด (Validation) ใน Express.js',
    creator: 'วรรษพจน์ ศรีพลอยรุ่ง',
    category: 'แบบฝึกหัด',
    publishedDate: '2026-04-02',
    description: 'แบบฝึกหัดเขียน Middleware และ Logic สำหรับตรวจสอบ Data Types, Sanitization ข้อมูลนำเข้า และการส่ง HTTP Error Status 400',
    status: false
  },
  {
    title: 'เทคนิคการปรับแต่งประสิทธิภาพฐานข้อมูล PostgreSQL ด้วย Indexing',
    creator: 'จิรเมธ วงษ์กัณหา',
    category: 'บทความ',
    publishedDate: '2026-04-18',
    description: 'อธิบายหลักการทำงานของ B-Tree, Hash และ GIN Index บน PostgreSQL เพื่อเพิ่มความเร็วในการ Query ข้อมูลขนาดใหญ่ได้อย่างมีประสิทธิภาพ',
    status: true
  },
  {
    title: 'สอนพื้นฐาน React Hooks: useState, useEffect และ Custom Hooks',
    creator: 'สมหมาย สุภาวงค์',
    category: 'วิดีโอ',
    publishedDate: '2026-05-12',
    description: 'ทำความเข้าใจ Life Cycle ของ Component ใน Functional Component และการจัดการ State อย่างมีแบบแผนใน React 18+',
    status: true
  },
  {
    title: 'แบบฝึกหัดการจัดการความปลอดภัย CORS และ HTTP Security Headers',
    creator: 'ทับตะวัน งามดี',
    category: 'แบบฝึกหัด',
    publishedDate: '2026-06-01',
    description: 'ทดลองกำหนดค่า Cross-Origin Resource Sharing เพื่ออนุญาตให้เฉพาะ Origin ที่ปลอดภัยสามารถเรียกใช้งาน Backend API ได้',
    status: true
  },
  {
    title: 'แนวทางการจัดการ Error Handling และ Logging ในระบบระดับ Production',
    creator: 'วรรษพจน์ ศรีพลอยรุ่ง',
    category: 'บทความ',
    publishedDate: '2026-06-25',
    description: 'บทความอธิบายกลยุทธ์การจับข้อผิดพลาดระดับ Global Middleware การไม่เปิดเผย Sensitive Stack Trace สู่ภายนอก และการบันทึก Log ลงฐานข้อมูล',
    status: false
  },
  {
    title: 'วิดีโอสอนการใช้งาน Git และ GitHub สำหรับการทำงานร่วมกันเป็นทีม',
    creator: 'จิรเมธ วงษ์กัณหา',
    category: 'วิดีโอ',
    publishedDate: '2026-07-10',
    description: 'สอนคำสั่ง Git พื้นฐาน branching, pull request, merge conflict resolution และการตั้งค่า GitHub Actions CI/CD Pipeline เบื้องต้น',
    status: true
  },
  {
    title: 'แบบฝึกหัดการเขียน Unit Test สำหรับ RESTful API ด้วย Jest และ Supertest',
    creator: 'สมหมาย สุภาวงค์',
    category: 'แบบฝึกหัด',
    publishedDate: '2026-08-05',
    description: 'ชุดแบบฝึกหัดสำหรับเขียน Automated Test ทดสอบความถูกต้องของ Response Status, Content-Type และ Schema ของ JSON API',
    status: true
  }
];

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    await sequelize.sync();
    console.log('Database synced.');

    const count = await LearningResource.count();
    if (count === 0) {
      console.log('No data found, seeding 12 initial learning resources...');
      await LearningResource.bulkCreate(sampleResources);
      console.log('Seeding completed successfully!');
    } else {
      console.log(`Database already contains ${count} records. Skipping seed.`);
    }
  } catch (error) {
    console.error('Error during database seeding:', error);
  }
};

if (require.main === module) {
  seedDatabase().then(() => {
    process.exit(0);
  });
}

module.exports = seedDatabase;
