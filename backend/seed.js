const sequelize = require('./config/db');
const { LearningResource } = require('./model/learningResource');

const sampleResources = [
  {
    title: 'เจาะลึกการพัฒนา RESTful API ด้วย Node.js และ Express สำหรับงาน Production',
    creator: 'Borntodev',
    category: 'บทความ',
    publishedDate: '2024-02-15',
    description: 'บทความอธิบายหลักการออกแบบ RESTful API ตั้งแต่โครงสร้าง Endpoint, HTTP Methods, Status Codes และ Best Practices ในการจัดการ Error Handling สำหรับงาน Production',
    status: true
  },
  {
    title: 'คอร์สเรียนฟรี Fullstack Node.js Express และ PostgreSQL เบื้องต้นถึงขั้นใช้งานจริง',
    creator: 'Kong Ruksiam Studio',
    category: 'วิดีโอ',
    publishedDate: '2024-03-10',
    description: 'วิดีโอสอนพัฒนา Backend Application แบบ Step-by-Step ด้วย Node.js, Express และการเชื่อมต่อฐานข้อมูลเชิงสัมพันธ์ PostgreSQL ผ่าน Sequelize ORM',
    status: true
  },
  {
    title: 'แบบฝึกหัดการเขียนคำสั่ง SQL Query และการออกแบบ Schema ฐานข้อมูลเชิงสัมพันธ์',
    creator: 'DataRockie',
    category: 'แบบฝึกหัด',
    publishedDate: '2024-04-05',
    description: 'ชุดโจทย์แบบฝึกหัดภาคปฏิบัติ 30 ข้อ ครอบคลุมคำสั่ง SELECT, JOIN, GROUP BY, การทำ Data Aggregation และการออกแบบ Foreign Key Constraints',
    status: true
  },
  {
    title: 'เทคนิคการสร้าง Responsive Web UI ด้วย React และ CSS Grid System',
    creator: 'Skooldio',
    category: 'บทความ',
    publishedDate: '2024-05-18',
    description: 'บทความแนะนำเทคนิคการจัด Layout แบบ Mobile-First การใช้ Grid และ Flexbox เพื่อให้หน้าเว็บแสดงผลได้อย่างสวยงามบนทุกขนาดหน้าจออุปกรณ์',
    status: true
  },
  {
    title: 'สอนสร้างเว็บแอปพลิเคชัน SPA ด้วย React 18, Vite และ React Hooks แบบจับมือทำ',
    creator: 'Uncle Engineer (ลุงวิศวกร สอนคำนวณ)',
    category: 'วิดีโอ',
    publishedDate: '2024-06-22',
    description: 'วิดีโอบรรยายและสาธิตการใช้ useState, useEffect, Custom Hooks และการส่งผ่าน Props เพื่อจัดการ State ในแอปพลิเคชันขนาดกลางอย่างมีประสิทธิภาพ',
    status: true
  },
  {
    title: 'แบบฝึกหัดการตรวจจับข้อผิดพลาดและการทำ Input Validation บน Express.js',
    creator: 'DevAHoy',
    category: 'แบบฝึกหัด',
    publishedDate: '2024-07-08',
    description: 'ชุดโจทย์ฝึกเขียน Logic สำหรับตรวจสอบข้อมูลนำเข้า การเช็คชนิดข้อมูล การตัดช่องว่าง (Sanitization) และการตอบกลับ HTTP 400 Bad Request ที่ถูกต้อง',
    status: false
  },
  {
    title: 'คู่มือความปลอดภัยเว็บเซอร์วิส: การป้องกัน OWASP Top 10 และการตั้งค่า CORS อย่างถูกต้อง',
    creator: 'Thai CERT',
    category: 'บทความ',
    publishedDate: '2024-08-14',
    description: 'บทความเจาะลึกช่องโหว่ความปลอดภัยยอดนิยม เช่น SQL Injection, Cross-Site Scripting (XSS) และแนวทางปฏิบัติด้านความปลอดภัยสำหรับ API Gateway',
    status: true
  },
  {
    title: 'วิดีโอสาธิตการ Deploy เว็บแอปพลิเคชันขึ้น Render (Backend) และ Vercel (Frontend)',
    creator: 'Siam HTML',
    category: 'วิดีโอ',
    publishedDate: '2024-09-01',
    description: 'วิดีโอขั้นตอนการนำโค้ดจาก GitHub ไป Deploy บน Cloud Platform การตั้งค่า Environment Variables และการเชื่อมโยง HTTPS API ข้ามโดเมน',
    status: true
  },
  {
    title: 'แบบฝึกหัดการประยุกต์ใช้ Git และ GitHub Flow ในการทำงานร่วมกันเป็นทีม',
    creator: 'สาขาวิชาวิทยาการคอมพิวเตอร์ มรภ.นครปฐม',
    category: 'แบบฝึกหัด',
    publishedDate: '2024-09-20',
    description: 'แบบฝึกหัดการจัดการ Branching Strategy, การเปิด Pull Request, การตรวจสอบ Code Review และการแก้ไขข้อขัดแย้งของโค้ด (Merge Conflicts)',
    status: true
  },
  {
    title: 'สถาปัตยกรรม Microservices กับระบบ Cloud Native: การวิเคราะห์ข้อดีและข้อจำกัด',
    creator: 'TechTalkThai',
    category: 'บทความ',
    publishedDate: '2024-10-02',
    description: 'บทความเปรียบเทียบระหว่าง Monolithic และ Microservices Architecture แนวทางการเลือกใช้เทคโนโลยี และความคุ้มค่าในการลงทุนสำหรับองค์กร',
    status: false
  },
  {
    title: 'สอนเทคนิคการ Optimize ประสิทธิภาพฐานข้อมูล PostgreSQL ด้วย Indexing และ Query Plan',
    creator: 'Chula MOOC',
    category: 'วิดีโอ',
    publishedDate: '2024-10-10',
    description: 'วิดีโออธิบายการทำงานของ B-Tree Index, การใช้ EXPLAIN ANALYZE ตรวจสอบ Query Performance และเทคนิคการจูนนิ่งฐานข้อมูลขนาดใหญ่',
    status: true
  },
  {
    title: 'แบบฝึกหัดการเขียน Automated API Testing ด้วย Jest และ Supertest',
    creator: 'Software Engineer Academy',
    category: 'แบบฝึกหัด',
    publishedDate: '2024-10-15',
    description: 'โจทย์ฝึกฝนการเขียน Integration Test สำหรับทดสอบ Endpoint GET, POST, PUT, DELETE ตรวจสอบ HTTP Status Code และ Schema ความถูกต้องของ JSON',
    status: false
  }
];

const seedDatabase = async (force = false) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    if (force) {
      await LearningResource.destroy({ truncate: true, cascade: true });
      console.log('Cleared existing table data.');
      await LearningResource.bulkCreate(sampleResources);
      console.log(`Successfully seeded ${sampleResources.length} authentic learning resources!`);
      return;
    }

    const count = await LearningResource.count();
    if (count === 0) {
      console.log(`No data found, seeding ${sampleResources.length} initial learning resources...`);
      await LearningResource.bulkCreate(sampleResources);
      console.log('Seeding completed successfully!');
    } else {
      console.log(`Database already contains ${count} records. (Run with force flag to re-seed)`);
    }
  } catch (error) {
    console.error('Error during database seeding:', error.message);
  }
};

if (require.main === module) {
  const isForce = process.argv.includes('--force');
  seedDatabase(isForce).then(() => {
    process.exit(0);
  });
}

module.exports = seedDatabase;
