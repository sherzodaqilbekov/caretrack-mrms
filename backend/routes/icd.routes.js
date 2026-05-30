// routes/icd.routes.js
// GET /api/icd?q=... — ICD kodi yoki nomi bo'yicha qidiruv (max 30 natija)

const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/icd.controller');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, ctrl.search);

module.exports = router;
