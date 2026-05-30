

const express  = require('express');
const router   = express.Router();
const ctrl     = require('../controllers/patient.controller');
const { authenticate, authorize } = require('../middleware/auth');


router.get('/', authenticate, ctrl.getAll);


router.get('/:id/profile', authenticate, ctrl.getPatientProfile);


router.get('/:id', authenticate, ctrl.getOne);


router.post('/', authenticate, authorize('admin', 'receptionist'), ctrl.create);


router.put('/:id', authenticate, authorize('admin', 'clinician'), ctrl.update);


router.delete('/:id', authenticate, authorize('admin'), ctrl.remove);

module.exports = router;
