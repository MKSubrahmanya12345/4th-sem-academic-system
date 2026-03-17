const express = require('express');
const { getSemesters, getSemester, createSemester, updateSemester, deleteSemester } = require('../controllers/semesterController');
const { protect } = require('../middleware/authMiddleware');
const checkMaintenance = require('../middleware/maintenanceMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getSemesters)
  .post(checkMaintenance, createSemester);

router.route('/:id')
  .get(getSemester)
  .put(checkMaintenance, updateSemester)
  .delete(checkMaintenance, deleteSemester);

module.exports = router;
