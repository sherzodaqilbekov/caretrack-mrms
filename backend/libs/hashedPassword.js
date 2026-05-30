// libs/hashedPassword.js
// bcryptjs yordamida parollarni xavfsiz saqlash uchun yordamchi funksiyalar.
// hashPassword  — ochiq parolni hash qiladi (saqlash uchun).
// comparePassword — kirish parolini saqlangan hash bilan solishtiradi.

const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10; // qanchalik kuchli hash (10 — standart, yetarli darajada xavfsiz)

// Ochiq paroldan bcrypt hash hosil qiladi
function hashPassword(plainText) {
  return bcrypt.hashSync(plainText, SALT_ROUNDS);
}

// Kirish parolini db dagi hash bilan solishtiradi — true/false qaytaradi
function comparePassword(plainText, hash) {
  return bcrypt.compareSync(plainText, hash);
}

module.exports = { hashPassword, comparePassword };
