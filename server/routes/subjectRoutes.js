const express = require('express');
const { getSubjectsBySemester, createSubject, updateSubject, deleteSubject, updateComponents } = require('../controllers/subjectController');
const { protect } = require('../middleware/authMiddleware');
const checkMaintenance = require('../middleware/maintenanceMiddleware');

const router = express.Router();

router.use(protect);

router.post('/', checkMaintenance, createSubject);
router.get('/semester/:semesterId', getSubjectsBySemester);
router.put('/:id', checkMaintenance, updateSubject);
router.put('/:id/components', checkMaintenance, updateComponents);
router.delete('/:id', checkMaintenance, deleteSubject);

module.exports = router;
