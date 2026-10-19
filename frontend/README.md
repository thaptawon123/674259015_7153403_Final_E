# ระบบบริหารจัดการสื่อการเรียนรู้ (Frontend)

ส่วนติดต่อผู้ใช้ (Frontend Application) พัฒนาด้วย **React** ร่วมกับ **Vite** และเชื่อมต่อกับ Backend RESTful API โดยรับ–ส่งข้อมูลในรูปแบบ JSON

## ข้อมูลนักศึกษาและโครงงาน
- **รายวิชา**: 7153403 เทคโนโลยีการบริการเว็บ (Web Service Technology) ภาคเรียนที่ 1 ปีการศึกษา 2569
- **ชุดโจทย์**: กลุ่มที่ 5 สื่อการเรียนรู้ (`learning_resources`) / ชุด E
- **ผู้พัฒนา**: นายทับตะวัน งามดี (รหัสประจำตัวนักศึกษา: 674259015)

---

## เครื่องมือและเทคโนโลยีที่ใช้ (Tech Stack)
- **Framework / Bundler**: React 18, Vite 5
- **HTTP Client**: Axios
- **Icon Library**: Lucide React
- **Styling**: Modern CSS3 (CSS Variables, Flexbox, CSS Grid, Responsive Design)
- **Deployment Platform**: Vercel

---

## โครงสร้างโฟลเดอร์ (Folder Structure)
ตรงตามข้อกำหนดในข้อสอบหน้าที่ 2:
```text
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AlertMessage.jsx         # กล่องแจ้งเตือนผลการทำงาน (Success/Error)
│   │   ├── DeleteConfirmModal.jsx   # หน้าต่างโมดัลยืนยันการลบข้อมูลพร้อมแสดงชื่อรายการ
│   │   ├── LoadingSpinner.jsx       # สถานะการโหลดข้อมูล (Spinner)
│   │   ├── Navbar.jsx               # แถบเมนูด้านบน แสดงหัวข้อและข้อมูลนักศึกษา
│   │   ├── ResourceDetailModal.jsx  # หน้าต่างโมดัลแสดงรายละเอียดครบทุกฟิลด์
│   │   ├── ResourceFormModal.jsx    # หน้าต่างโมดัลเพิ่มและแก้ไขข้อมูล (Validation ครบถ้วน)
│   │   ├── ResourceTable.jsx        # ตารางแสดงรายการข้อมูล พร้อม Badge หมวดหมู่และสถานะ
│   │   └── SearchBar.jsx            # ค้นหาชื่อ/หัวข้อบางส่วน และกรองหมวดหมู่
│   ├── pages/
│   │   └── HomePage.jsx             # หน้าจอหลักควบคุม State และการเรียก API
│   ├── services/
│   │   ├── api.js                   # ตั้งค่า Axios Base URL และ Timeout
│   │   └── learningResourceService.js # ฟังก์ชันเรียก RESTful API ของสื่อการเรียนรู้
│   ├── App.css                      # สไตล์ชีตสำหรับ Component ต่างๆ
│   ├── App.jsx                      # คอมโพเนนต์หลักของ React
│   ├── index.css                    # สไตล์ชีตระดับ Global และตัวแปรสี
│   └── main.jsx                     # จุดเริ่มต้นการ Render React เข้ากับ DOM
├── .env                             # กำหนด VITE_API_URL ใน Local
├── .env.example                     # ไฟล์ตัวอย่าง Environment Variables
├── .gitignore                       # กำหนดไฟล์ที่ไม่ต้องส่งเข้า Git
├── eslint.config.js
├── index.html                       # ไฟล์ HTML หลัก พร้อมฟอนต์ภาษาไทย (Prompt)
├── package.json
├── package-lock.json
├── vercel.json                      # การตั้งค่า Rewrite รองรับ Single Page Application
└── vite.config.js                   # การตั้งค่า Vite
```

---

## การติดตั้งและเริ่มทำงานบนเครื่อง Local

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. ตั้งค่าตัวแปรสภาพแวดล้อม (.env)
คัดลอกไฟล์ `.env.example` เป็น `.env`:
```bash
cp .env.example .env
```
ตรวจสอบให้แน่ใจว่า `VITE_API_URL` ชี้ไปยัง Backend API:
```env
VITE_API_URL=http://localhost:5000
```

### 3. เริ่มระบบสำหรับ Development
```bash
npm run dev
```
เปิดเบราว์เซอร์ไปที่: `http://localhost:5173`

### 4. สั่ง Build สำหรับ Production
```bash
npm run build
```

---

## การนำขึ้นใช้งานจริงบน Vercel (Deployment)
1. นำ Repository ขึ้น GitHub
2. เข้าสู่ [Vercel Dashboard](https://vercel.com) และกด **Add New Project**
3. เลือก Repository `674259015_7153403_Final_E`
4. กำหนดการตั้งค่า:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. เพิ่ม Environment Variable:
   - `VITE_API_URL`: ใส่ HTTPS URL ของ Backend บน Render (เช่น `https://your-backend.onrender.com`)
6. กด **Deploy**
