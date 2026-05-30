// controllers/icd.controller.js
// icd.json (15 000+ yozuv) server ishga tushganda BIR MARTA o'qiladi
// va modul darajasida xotirada saqlanadi — har so'rovda fayldan o'qilmaydi.

const icdList = require('../icd.json'); // [{ code, name }, ...]

// GET /api/icd?q=...  — kod yoki nomda q bo'lgan, eng ko'pi 30 ta natija
function search(req, res) {
  const q = (req.query.q || '').trim().toLowerCase();

  // Bo'sh so'rov — bo'sh massiv qaytaramiz
  if (!q) return res.json([]);

  const results = icdList
    .filter(
      (item) =>
        item.code.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q)
    )
    .slice(0, 30); // ko'pi bilan 30 ta natija

  res.json(results);
}

module.exports = { search };
