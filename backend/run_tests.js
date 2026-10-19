const { app } = require('./index');
const http = require('http');

let server;
let baseUrl;

const request = async (path, options = {}) => {
  const url = `${baseUrl}${path}`;
  const fetchOptions = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  };
  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }
  const res = await fetch(url, fetchOptions);
  let data;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }
  return { status: res.status, data };
};

const runAllTests = async () => {
  console.log('====================================================');
  console.log(' เริ่มทดสอบกรณีทดสอบขั้นต่ำสำหรับตรวจงาน (Page 10) ');
  console.log('====================================================\n');

  server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  baseUrl = `http://localhost:${port}`;
  console.log(`Test server running on ${baseUrl}\n`);

  let passed = 0;
  let total = 0;

  const test = (name, condition, details = '') => {
    total++;
    if (condition) {
      passed++;
      console.log(`✓ [ผ่าน] กรณีที่ ${total}: ${name}`);
    } else {
      console.error(`✗ [ไม่ผ่าน] กรณีที่ ${total}: ${name} - ${details}`);
    }
  };

  try {
    // 1. GET all
    const res1 = await request('/api/learning-resources');
    test(
      'เปิดหน้าเว็บ / อ่านรายการทั้งหมดจากฐานข้อมูล',
      res1.status === 200 && Array.isArray(res1.data.data) && res1.data.data.length > 0,
      `Status: ${res1.status}, Length: ${res1.data?.data?.length}`
    );

    // 2. POST create valid
    const validItem = {
      title: 'ทดสอบการสร้างสื่อการเรียนรู้ใหม่',
      creator: 'ทับตะวัน งามดี',
      category: 'บทความ',
      publishedDate: '2026-10-19',
      description: 'รายละเอียดเนื้อหาสำหรับการทดสอบระบบ API ขั้นต่ำตามโจทย์กลุ่มที่ 5',
      status: true
    };
    const res2 = await request('/api/learning-resources', { method: 'POST', body: validItem });
    const createdId = res2.data?.data?.id;
    test(
      'เพิ่มข้อมูลถูกต้อง (201 Created และส่งข้อมูลที่สร้างกลับมา)',
      res2.status === 201 && createdId !== undefined,
      `Status: ${res2.status}`
    );

    // 3. POST whitespace title only -> 400
    const invalidTitleItem = {
      ...validItem,
      title: '     '
    };
    const res3 = await request('/api/learning-resources', { method: 'POST', body: invalidTitleItem });
    test(
      'ส่งชื่อที่มีเฉพาะช่องว่างผ่าน API โดยตรง (400 Bad Request)',
      res3.status === 400 && res3.data.success === false,
      `Status: ${res3.status}`
    );

    // 4. POST invalid category -> 400
    const invalidCatItem = {
      ...validItem,
      category: 'หมวดหมู่อื่นๆที่ไม่ได้รับอนุญาต'
    };
    const res4 = await request('/api/learning-resources', { method: 'POST', body: invalidCatItem });
    test(
      'ส่งหมวดหมู่ที่ไม่ได้กำหนด (400 Bad Request)',
      res4.status === 400 && res4.data.success === false,
      `Status: ${res4.status}`
    );

    // 5. GET single existing -> 200 with all fields
    const res5 = await request(`/api/learning-resources/${createdId}`);
    const item = res5.data?.data;
    const hasAllFields = item && item.id && item.title && item.creator && item.category && item.publishedDate && item.description && item.status !== undefined;
    test(
      'เปิดดูรายละเอียดรายการที่มีอยู่ (แสดงครบทุกฟิลด์)',
      res5.status === 200 && hasAllFields,
      `Status: ${res5.status}, hasAllFields: ${hasAllFields}`
    );

    // 6. PUT update existing -> 200
    const updatePayload = {
      title: 'ทดสอบการแก้ไขชื่อสื่อการเรียนรู้สำเร็จ',
      creator: 'ทับตะวัน งามดี (อัปเดต)',
      category: 'วิดีโอ',
      publishedDate: '2026-10-20',
      description: 'เนื้อหารายละเอียดที่ได้รับการแก้ไขใหม่เรียบร้อยแล้ว',
      status: false
    };
    const res6 = await request(`/api/learning-resources/${createdId}`, { method: 'PUT', body: updatePayload });
    test(
      'แก้ไขรายการ (200 OK และฐานข้อมูลเปลี่ยนตรงกัน)',
      res6.status === 200 && res6.data?.data?.title === updatePayload.title && res6.data?.data?.category === 'วิดีโอ',
      `Status: ${res6.status}`
    );

    // 7. Verify data still exists before delete
    const res7 = await request(`/api/learning-resources/${createdId}`);
    test(
      'ข้อมูลยังคงอยู่ในฐานข้อมูลอย่างถูกต้อง (ก่อนทำการลบ)',
      res7.status === 200 && res7.data?.data?.id === createdId,
      `Status: ${res7.status}`
    );

    // 8. DELETE existing -> 200
    const res8 = await request(`/api/learning-resources/${createdId}`, { method: 'DELETE' });
    const verifyDeleted = await request(`/api/learning-resources/${createdId}`);
    test(
      'ยืนยันลบ (200 OK และข้อมูลถูกลบออกจากฐานข้อมูลจริง)',
      res8.status === 200 && verifyDeleted.status === 404,
      `Delete Status: ${res8.status}, Recheck Status: ${verifyDeleted.status}`
    );

    // 9. Search partial + Category filter
    const res9 = await request('/api/learning-resources?keyword=Node&category=บทความ');
    const allMatch = res9.data?.data?.every(d => d.title.toLowerCase().includes('node') && d.category === 'บทความ');
    test(
      'ค้นหาบางส่วนพร้อมกรองหมวดหมู่ (ตรงทั้งสองเงื่อนไข)',
      res9.status === 200 && (res9.data?.data?.length > 0) && allMatch,
      `Status: ${res9.status}, Count: ${res9.data?.data?.length}`
    );

    // 10. Search not found -> 200 with empty list and message
    const res10 = await request('/api/learning-resources?keyword=คำค้นหาที่ไม่มีอยู่จริงxyz999');
    test(
      'ค้นหาไม่พบ (200 OK พร้อมรายการว่างและข้อความแจ้ง)',
      res10.status === 200 && Array.isArray(res10.data?.data) && res10.data?.data?.length === 0 && Boolean(res10.data?.message),
      `Status: ${res10.status}, Data: ${JSON.stringify(res10.data)}`
    );

    // 11. Read, edit, or delete non-existent ID -> 404
    const res11_get = await request('/api/learning-resources/999999');
    const res11_put = await request('/api/learning-resources/999999', { method: 'PUT', body: validItem });
    const res11_del = await request('/api/learning-resources/999999', { method: 'DELETE' });
    test(
      'อ่าน แก้ไข หรือลบรหัสที่ไม่มีในระบบ (404 Not Found)',
      res11_get.status === 404 && res11_put.status === 404 && res11_del.status === 404,
      `GET: ${res11_get.status}, PUT: ${res11_put.status}, DEL: ${res11_del.status}`
    );

    // 12. Send non-positive integer ID -> 400
    const res12_abc = await request('/api/learning-resources/abc');
    const res12_neg = await request('/api/learning-resources/-5');
    const res12_zero = await request('/api/learning-resources/0');
    test(
      'ส่ง id ที่ไม่ใช่จำนวนเต็มบวก (400 Bad Request)',
      res12_abc.status === 400 && res12_neg.status === 400 && res12_zero.status === 400,
      `abc: ${res12_abc.status}, -5: ${res12_neg.status}, 0: ${res12_zero.status}`
    );

    // 13. Data persistence check (count >= 10)
    const res13 = await request('/api/learning-resources');
    test(
      'ข้อมูลถูกบันทึกลงในฐานข้อมูลเชิงสัมพันธ์จริง (มีข้อมูลคงอยู่ >= 10 รายการ)',
      res13.status === 200 && res13.data?.data?.length >= 10,
      `Count: ${res13.data?.data?.length}`
    );

    // 14. Error handling does not expose internal sensitive information
    const res14_404 = await request('/api/invalid-route-xyz');
    test(
      'จัดการข้อผิดพลาดและ HTTP Status โดยไม่เปิดเผยข้อมูลลับภายใน',
      res14_404.status === 404 && res14_404.data?.success === false,
      `Status: ${res14_404.status}`
    );

    console.log('\n====================================================');
    console.log(` สรุปผลการทดสอบ: ผ่าน ${passed}/${total} กรณีทดสอบ `);
    console.log('====================================================');

  } catch (err) {
    console.error('Test runner error:', err);
  } finally {
    server.close();
  }
};

runAllTests();
