const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middleware/auth');

// O'z profilini ko'rish va parolini o'zgartirish — BARCHA authenticated foydalanuvchilar uchun
// MUHIM: bu yo'llar /:id dan OLDIN bo'lishi kerak, aks holda "me" id sifatida o'qiladi
router.get('/me',          authenticate, ctrl.getMe);
router.put('/me/password', authenticate, ctrl.changeMyPassword);

// Faqat admin uchun — boshqa foydalanuvchilarni boshqarish
router.get('/',       authenticate, authorize('admin'), ctrl.getAll);
router.get('/:id',    authenticate, authorize('admin'), ctrl.getOne);
router.post('/',      authenticate, authorize('admin'), ctrl.create);
router.put('/:id',    authenticate, authorize('admin'), ctrl.update);
router.delete('/:id', authenticate, authorize('admin'), ctrl.remove);

module.exports = router;
