# รายงานโครงงานข้อสอบปลายภาค: ระบบบริหารจัดการสื่อการเรียนรู้ (Learning Resources Management System)

- **รายวิชา**: 7153403 เทคโนโลยีการบริการเว็บ (Web Service Technology)
- **ภาคเรียน**: ภาคเรียนที่ 1 ปีการศึกษา 2569
- **คะแนนเต็ม**: 100 คะแนน
- **ชื่อคลังจัดเก็บ (Repository)**: `674259015_7153403_Final_E`
- **ผู้จัดทำ**: นายทับตะวัน งามดี (รหัสประจำตัวนักศึกษา: 674259015)
- **ชุดโจทย์ที่ได้รับจากการสุ่ม**: กลุ่มที่ 5 สื่อการเรียนรู้ / ชุด E

---

## 1. ข้อมูลชุดโจทย์และโครงสร้างข้อมูล (Group 5 / Set E)

| ข้อมูล | รายละเอียด |
| :--- | :--- |
| **ชุดและระบบ** | กลุ่มที่ 5 สื่อการเรียนรู้ (`learning_resources`) |
| **ชื่อตารางฐานข้อมูล** | `learning_resources` |
| **เส้นทางหลัก API (Endpoint)** | `/api/learning-resources` |
| **ผู้รับผิดชอบตามชุด** | `creator` (ผู้สร้าง) |
| **วันที่ตามชุด** | `publishedDate` (วันที่เผยแพร่) |
| **หมวดหมู่ที่เลือกได้ (ชุด E)** | `บทความ`, `วิดีโอ`, `แบบฝึกหัด` |

### ฟิลด์ข้อมูลในฐานข้อมูล (Sequelize Model Specification)
| ชื่อฟิลด์ | ชนิดข้อมูล Sequelize | ข้อกำหนดและเงื่อนไขความถูกต้อง |
| :--- | :--- | :--- |
| `id` | `INTEGER` | Primary Key, Auto Increment, ไม่อนุญาตให้เป็น null |
| `title` | `STRING(150)` | ต้องระบุ 1–150 ตัวอักษร, ข้อความที่มีเฉพาะช่องว่างถือว่าไม่ได้ระบุ |
| `creator` | `STRING(100)` | ต้องระบุ 1–100 ตัวอักษร, ข้อความที่มีเฉพาะช่องว่างถือว่าไม่ได้ระบุ |
| `category` | `STRING(50)` | ต้องเลือกจากหมวดหมู่: `บทความ`, `วิดีโอ`, `แบบฝึกหัด` |
| `publishedDate` | `DATEONLY` | รูปแบบวันที่ปฏิทินที่ถูกต้อง `YYYY-MM-DD` |
| `description` | `TEXT` | ต้องระบุ 1–2,000 ตัวอักษร, ข้อความที่มีเฉพาะช่องว่างถือว่าไม่ได้ระบุ |
| `status` | `BOOLEAN` | ค่าเริ่มต้น `true` (`true` = เผยแพร่, `false` = ฉบับร่าง) |
| `createdAt` | `TIMESTAMP` | วันเวลาที่สร้างข้อมูล (Sequelize สร้างให้อัตโนมัติ) |
| `updatedAt` | `TIMESTAMP` | วันเวลาที่แก้ไขข้อมูลล่าสุด (Sequelize ปรับปรุงให้อัตโนมัติ) |

---

## 2. เครื่องมือและเทคโนโลยีที่ใช้ในการพัฒนา (Tech Stack)

### Backend
- **Runtime & Framework**: Node.js, Express.js
- **Object-Relational Mapping (ORM)**: Sequelize v6
- **Database Driver**: `pg` (PostgreSQL), `mysql2`
- **Database Engine**: PostgreSQL (รองรับทั้ง Local PostgreSQL และ Online Managed PostgreSQL เช่น Render / Neon / Supabase)
- **Security & Utilities**: `cors`, `dotenv`
- **Development Tool**: `nodemon`

### Frontend
- **Framework & Tooling**: React 18, Vite 5
- **HTTP Client**: Axios (เชื่อมต่อ RESTful API พร้อม Timeout และจัดการ Base URL)
- **Icons**: Lucide React
- **Styling**: Modern Responsive CSS3 (CSS Variables, Flexbox, CSS Grid)
- **Single Page Application Support**: `vercel.json` (Rewrite configuration)

---

## 3. โครงสร้างไฟล์และโฟลเดอร์ของโครงการ (Project Directory Structure)

ตรงตามข้อกำหนดในข้อสอบหน้าที่ 2:
```text
674259015_7153403_Final_E/
├── backend/
│   ├── config/
│   │   └── db.js                    # การเชื่อมต่อฐานข้อมูล Sequelize (รองรับทั้ง URL และแยกตัวแปร)
│   ├── controller/
│   │   └── learningResourceController.js # การตรวจสอบเงื่อนไข (Validation) และการทำ CRUD ทั้ง 5 Endpoints
│   ├── model/
│   │   └── learningResource.js      # Sequelize Model นิยามตาราง learning_resources
│   ├── router/
│   │   └── learningResourceRouter.js # กำหนด Route สำหรับ /api/learning-resources
│   ├── .env                         # ค่าคอนฟิกเซิร์ฟเวอร์และรหัสผ่านฐานข้อมูลใน Local
│   ├── .env.example                 # ตัวอย่างการกำหนดค่า Environment Variables
│   ├── index.js                     # จุดเริ่มต้นเซิร์ฟเวอร์ Express, CORS, Middleware, Error Handlers
│   ├── nodemon.json                 # การตั้งค่า nodemon สำหรับการพัฒนา
│   ├── package.json                 # Dependencies และ Scripts
│   ├── package-lock.json
│   ├── run_tests.js                 # สคริปต์ทดสอบอัตโนมัติตาม 14 กรณีทดสอบ (Page 10)
│   └── seed.js                      # ข้อมูลเริ่มต้นอย่างน้อย 12 รายการ ครบทั้ง 3 หมวดหมู่ และมีทั้งเผยแพร่/ฉบับร่าง
│
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AlertMessage.jsx         # กล่องแจ้งเตือนผลการทำงาน (Success/Error)
│   │   │   ├── DeleteConfirmModal.jsx   # โมดัลยืนยันการลบ พร้อมแสดงชื่อรายการ
│   │   │   ├── LoadingSpinner.jsx       # สถานะการโหลดข้อมูล
│   │   │   ├── Navbar.jsx               # แถบด้านบนแสดงชื่อระบบและข้อมูลนักศึกษา
│   │   │   ├── ResourceDetailModal.jsx  # โมดัลแสดงรายละเอียดครบทุกฟิลด์
│   │   │   ├── ResourceFormModal.jsx    # โมดัลเพิ่มและแก้ไขข้อมูล พร้อม Client-side Validation
│   │   │   ├── ResourceTable.jsx        # ตารางแสดงข้อมูล พร้อม Badge สถานะและหมวดหมู่
│   │   │   └── SearchBar.jsx            # ค้นหาคำค้นบางส่วน กรองหมวดหมู่ และปุ่มล้างเงื่อนไข
│   │   ├── pages/
│   │   │   └── HomePage.jsx             # หน้าจอหลักควบคุม State และเรียกใช้งาน Service
│   │   ├── services/
│   │   │   ├── api.js                   # Axios Client ตั้งค่า Base URL อัตโนมัติ
│   │   │   └── learningResourceService.js # ฟังก์ชันเรียก REST API
│   │   ├── App.css                      # สไตล์ชีตสำหรับ Component
│   │   ├── App.jsx                      # คอมโพเนนต์หลัก
│   │   ├── index.css                    # สไตล์ชีตหลักและตัวแปรสี
│   │   └── main.jsx                     # จุด Render React
│   ├── .env                             # VITE_API_URL ในเครื่อง Local
│   ├── .env.example                     # ตัวอย่างการกำหนดค่า VITE_API_URL
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html                       # HTML หลัก พร้อมฟอนต์ไทย Prompt
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── vercel.json                      # Rewrite rules สำหรับ Vercel
│   └── vite.config.js
│
├── screenshots/                         # โฟลเดอร์เก็บภาพหลักฐานหน้าจอระบบ
│   ├── 01_list_and_search.png
│   ├── 02_create_modal.png
│   ├── 03_edit_modal.png
│   ├── 04_delete_confirm.png
│   ├── 05_detail_view.png
│   ├── 06_vercel_deploy.png
│   └── 07_render_deploy.png
│
├── .gitignore
└── README.md
```

---

## 4. ขั้นตอนการติดตั้งและการเริ่มระบบในเครื่อง Local (Installation & Setup)

### 4.1 การเตรียมฐานข้อมูล PostgreSQL
1. เปิดโปรแกรม PostgreSQL (เช่น pgAdmin หรือ psql)
2. สร้างฐานข้อมูลชื่อ `learning_resources_db`:
   ```sql
   CREATE DATABASE learning_resources_db;
   ```

### 4.2 การติดตั้งและเริ่มทำงานส่วน Backend
```bash
# 1. เข้าสู่โฟลเดอร์ backend
cd backend

# 2. ติดตั้ง Dependencies
npm install

# 3. ตั้งค่า .env โดยคัดลอกมาจาก .env.example
cp .env.example .env
```
ตรวจสอบและแก้ไขไฟล์ `backend/.env` ให้ตรงกับ PostgreSQL ของคุณ:
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=learning_resources_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_DIALECT=postgres
DB_SSL=false
CORS_ORIGIN=*
```

```bash
# 4. นำเข้าข้อมูลเริ่มต้น (Seed Data อย่างน้อย 12 รายการ)
npm run seed

# 5. รันเซิร์ฟเวอร์ Backend
npm run dev
# หรือ npm start สำหรับโหมดปกติ
```
Backend API จะเปิดให้บริการที่: `http://localhost:5000`

### 4.3 การทดสอบอัตโนมัติ (Automated Test Suite)
สามารถรันชุดทดสอบเพื่อตรวจทั้ง 14 กรณีทดสอบตามเกณฑ์ข้อสอบ (Page 10) ได้ทันที:
```bash
cd backend
npm test
```
*ผลลัพธ์จะแสดงผลการทดสอบผ่าน 14/14 กรณีทดสอบ*

---

### 4.4 การติดตั้งและเริ่มทำงานส่วน Frontend
```bash
# 1. เปิด Terminal ใหม่แล้วเข้าสู่โฟลเดอร์ frontend
cd frontend

# 2. ติดตั้ง Dependencies
npm install

# 3. ตั้งค่า .env
cp .env.example .env
```
ตรวจสอบไฟล์ `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
```

```bash
# 4. เริ่มระบบ Frontend
npm run dev
```
เปิดเบราว์เซอร์ไปที่: `http://localhost:5173`

---

## 5. ข้อกำหนด RESTful API และรูปแบบข้อมูล JSON

การรับ–ส่งข้อมูลกับ Backend API ใช้รูปแบบ JSON ที่สม่ำเสมอ:
- คำขอสำเร็จ: จะส่งข้อมูลในฟิลด์ `data` พร้อม `success: true`
- คำขอผิดพลาด: จะส่งรหัสสถานะ HTTP ที่ถูกต้อง พร้อมฟิลด์ `message` อธิบายสาเหตุ และ `success: false`

### ตารางสรุป 5 Endpoints
| เมธอด (HTTP Method) | เส้นทาง (Endpoint) | หน้าที่การทำงาน | รหัสสถานะสำเร็จ |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/learning-resources` | อ่านรายการทั้งหมด ค้นหาตามคำค้น และกรองหมวดหมู่ | `200 OK` |
| **GET** | `/api/learning-resources/:id` | อ่านรายละเอียดหนึ่งรายการตามรหัส | `200 OK` |
| **POST** | `/api/learning-resources` | เพิ่มข้อมูลสื่อการเรียนรู้ใหม่ | `201 Created` |
| **PUT** | `/api/learning-resources/:id` | แก้ไขข้อมูลสื่อการเรียนรู้ | `200 OK` |
| **DELETE** | `/api/learning-resources/:id` | ลบข้อมูลสื่อการเรียนรู้ | `200 OK` |

### ตัวอย่าง Request / Response ในแต่ละสถานะ

#### 1. อ่านรายการ ค้นหา และกรอง (GET `/api/learning-resources?keyword=Node&category=บทความ`)
```json
{
  "success": true,
  "total": 1,
  "data": [
    {
      "id": 1,
      "title": "คู่มือการพัฒนา RESTful API ด้วย Node.js และ Express เบื้องต้น",
      "creator": "ทับตะวัน งามดี",
      "category": "บทความ",
      "publishedDate": "2026-01-15",
      "description": "เรียนรู้หลักการออกแบบ RESTful API สถาปัตยกรรม Client-Server...",
      "status": true,
      "createdAt": "2026-10-19T07:35:37.079Z",
      "updatedAt": "2026-10-19T07:35:37.079Z"
    }
  ]
}
```

#### 2. ค้นหาไม่พบข้อมูล (GET `/api/learning-resources?keyword=ไม่มีข้อมูล`)
- **HTTP Status**: `200 OK`
```json
{
  "success": true,
  "total": 0,
  "data": [],
  "message": "ไม่พบข้อมูลสื่อการเรียนรู้ตามเงื่อนไขที่ระบุ"
}
```

#### 3. ข้อมูลไม่ผ่านเงื่อนไข หรือ id ไม่ใช่จำนวนเต็มบวก (HTTP `400 Bad Request`)
```json
{
  "success": false,
  "message": "ชื่อสื่อการเรียนรู้ และต้องไม่เป็นช่องว่างล้วน",
  "errors": [
    "กรุณาระบุชื่อสื่อการเรียนรู้ และต้องไม่เป็นช่องว่างล้วน"
  ]
}
```

#### 4. รหัสข้อมูลไม่มีในฐานข้อมูล (HTTP `404 Not Found`)
```json
{
  "success": false,
  "message": "ไม่พบข้อมูลสื่อการเรียนรู้รหัส 999"
}
```

#### 5. ข้อผิดพลาดภายในระบบ (HTTP `500 Internal Server Error`)
ระบบจะไม่เปิดเผย Stack Trace หรือข้อมูลภายในที่เป็นความลับ:
```json
{
  "success": false,
  "message": "เกิดข้อผิดพลาดภายในระบบ ไม่สามารถดึงข้อมูลได้"
}
```

---

## 6. ผลการทดสอบตามกรณีทดสอบขั้นต่ำสำหรับตรวจงาน (14 Test Cases)

| ลำดับ | กรณีทดสอบตามเกณฑ์ข้อสอบ (หน้าที่ 10) | ผลที่คาดหวัง | ผลการทดสอบจริง | สถานะ |
| :---: | :--- | :--- | :--- | :---: |
| **1** | เปิดหน้าเว็บ | แสดงข้อมูลจากฐานข้อมูล | อ่านข้อมูล 12 รายการจากฐานข้อมูลสำเร็จ | **ผ่าน** |
| **2** | เพิ่มข้อมูลถูกต้อง | ตอบ 201 และแสดงรายการใหม่ | ได้รับ 201 Created และส่ง Object กลับมา | **ผ่าน** |
| **3** | ส่งชื่อที่มีเฉพาะช่องว่างผ่าน API โดยตรง | ตอบ 400 และไม่เพิ่มข้อมูล | ได้รับ 400 Bad Request และข้อมูลไม่ถูกบันทึก | **ผ่าน** |
| **4** | ส่งหมวดหมู่ที่ไม่กำหนด | ตอบ 400 | ได้รับ 400 Bad Request เมื่อส่งหมวดหมู่นอกเหนือ 3 ชนิด | **ผ่าน** |
| **5** | เปิดรายละเอียดรายการที่มีอยู่ | แสดงข้อมูลครบทุกฟิลด์ | แสดง id, title, creator, category, date, desc, status, timestamps ครบ | **ผ่าน** |
| **6** | แก้ไขรายการ | หน้าเว็บและฐานข้อมูลเปลี่ยนตรงกัน | ได้รับ 200 OK และข้อมูลใน PostgreSQL อัปเดตตรงกัน | **ผ่าน** |
| **7** | ยกเลิกการลบ | ข้อมูลยังคงอยู่ | เมื่อกดยกเลิกในหน้าต่างยืนยัน ข้อมูลใน DB ยังอยู่คงเดิม | **ผ่าน** |
| **8** | ยืนยันลบ | ลบจากฐานข้อมูลและหน้าเว็บ | ได้รับ 200 OK และตรวจสอบในฐานข้อมูลพบ 404 Not Found | **ผ่าน** |
| **9** | ค้นหาบางส่วนพร้อมกรองหมวดหมู่ | ตรงทั้งสองเงื่อนไข | ผลลัพธ์ตรงทั้งคำค้นชื่อและหมวดหมู่ที่เลือก | **ผ่าน** |
| **10** | ค้นหาไม่พบ | ตอบ 200 พร้อมรายการว่างและข้อความแจ้ง | ได้รับ 200 OK, `data: []` และข้อความแจ้งเตือน | **ผ่าน** |
| **11** | อ่าน แก้ไข หรือลบรหัสที่ไม่มี | ตอบ 404 | ได้รับ 404 Not Found ทั้งการ GET, PUT, DELETE | **ผ่าน** |
| **12** | ส่ง id ที่ไม่ใช่จำนวนเต็มบวก | ตอบ 400 | ส่ง `abc`, `-5`, `0` ได้รับ 400 Bad Request ทุกกรณี | **ผ่าน** |
| **13** | รีเฟรชและเริ่ม Backend ใหม่ | ข้อมูลยังอยู่ | ข้อมูลจัดเก็บใน PostgreSQL ถาวร ไม่สูญหาย | **ผ่าน** |
| **14** | เรียก API ไม่สำเร็จ | แจ้งข้อผิดพลาดและใช้งานต่อได้ | หน้าเว็บแสดง AlertBanner แจ้งเตือน และระบบไม่ Crash | **ผ่าน** |

---

## 7. ข้อมูลการนำระบบขึ้นใช้งานจริง (Production Deployment)

### 7.1 Frontend บน Vercel
- **Production URL**: `https://674259015-7153403-final-e.vercel.app/` 
- **Root Directory**: `frontend`
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 7.2 Backend บน Render
- **Base URL ของ API**: `https://learning-resources-backend-674259015.onrender.com` 
- **Environment**: `Node`
- **Root Directory**: `backend`
- **Build Command**: `npm ci`
- **Start Command**: `npm start` (รัน `node index.js`)
- **Environment Variables**:
  - `NODE_ENV`: `production`
  - `PORT`: (Render กำหนดให้อัตโนมัติและรับผ่าน `process.env.PORT`)
  - `DATABASE_URL`: `postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DB_NAME]?sslmode=require` (จาก Render PostgreSQL หรือ Neon)
  - `CORS_ORIGIN`: `*` (หรือระบุโดเมนของ Vercel)
- **การพักตัวของบริการฟรี (Cold Start)**: กรณี Render พักการทำงาน (Sleep) เมื่อไม่มีคำขอ จะใช้เวลาปลุกระบบประมาณ 30-50 วินาทีในการเรียกใช้งานครั้งแรก

---

## 8. ภาพหน้าจอการทำงานของระบบ (Screenshots)

### 8.1 หน้ารายการข้อมูลสื่อการเรียนรู้ พร้อมระบบค้นหาและกรองหมวดหมู่

### 8.2 หน้าต่างโมดัลเพิ่มสื่อการเรียนรู้ (พร้อม Validation ครบทุกฟิลด์)


### 8.3 หน้าต่างโมดัลแก้ไขสื่อการเรียนรู้


### 8.4 หน้าต่างโมดัลยืนยันการลบข้อมูล (แสดงชื่อรายการก่อนลบ)


### 8.5 หน้าต่างโมดัลแสดงรายละเอียดครบทุกฟิลด์


### 8.6 ภาพสถานะ Deploy สำเร็จบน Vercel และ Render
