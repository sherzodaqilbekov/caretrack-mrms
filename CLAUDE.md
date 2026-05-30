# CareTrack Clinic — TYBT (Tibbiy Yozuvlarni Boshqarish Tizimi / MRMS)

BTEC Level 3, Unit 25 (Full Stack Dasturlash) yakuniy loyihasi.
CareTrack Clinic klinikasi uchun veb-asosidagi tibbiy yozuvlarni boshqarish tizimi.

## Texnologiya to'plami (O'ZGARMAYDI)
- Backend: Node.js + Express (REST API). Kirish fayli: `server.js` (backend papkasida).
- Ma'lumotlar bazasi: JSON fayl bazasi (`db.json`), `db.js` orqali `fs` bilan
  o'qiladi/yoziladi. MongoDB, SQLite va boshqa baza ISHLATILMAYDI.
- Frontend: HTML + Bootstrap 5 (CDN). Alohida `.js`/`.css` fayl YO'Q —
  JavaScript HTML faylning ichidagi `<script>` tegida yoziladi.
- Auth: JWT + bcrypt (parol shifrlash). Token frontendda localStorage'da saqlanadi.

## Loyiha tuzilmasi
caretrack-mrms/
- backend/  — server.js, controllers/, models/, routes/, middleware/, libs/,
  db.js, db.json, package.json
- frontend/ — login.html, dashboard.html, doctors.html, patients.html,
  diagnoses.html, patient-profile.html

server.js statik fayllarni `../frontend` papkadan uzatadi.
Ishga tushirish: `backend` papkasida `node server.js` → http://localhost:3000

## Ma'lumotlar modeli
- User: email, password (bcrypt), role.
- Doctor: fullName, specialty, department, email, phone.
- Patient: fullName, dateOfBirth, gender, address, phone, doctorId (FK).
- Diagnosis: icdCode, description, severity, patientId (FK), diagnosedDate.
Bog'lanish: Doctor 1—* Patient (doctorId); Patient 1—* Diagnosis (patientId).

## Rollar (RBAC) — ichki qiymat / ko'rinadigan nom
- admin → "Administrator": barcha jadvallarga to'liq CRUD.
- clinician → "Klinitsist": bemor va tashxisni ko'rish va yangilash
  (o'chirish yo'q, shifokor qo'shish yo'q).
- receptionist → "Qabulxona bo'limi": yangi bemor qo'shish, shifokorlarni ko'rish.

## Bajarilgan
3 ta CRUD (Doctor, Patient, Diagnosis), bog'lanishlar, to'liq bemor profili,
Login + JWT + RBAC, Dashboard, qidiruv, frontend/backend ajratmasi.

## Kod uslubi qoidalari
- Izohlar o'zbekcha, kod yangi boshlovchi tushunadigan darajada SODDA.
- Mavjud naqshlarga (controller/model/route) o'xshatib davom ettir.
- Bir vaqtda BITTA funksiya; har o'zgarishdan keyin o'zbekcha tushuntir.
