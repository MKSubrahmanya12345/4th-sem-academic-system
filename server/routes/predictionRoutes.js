const express = require('express');
const { getSGPA, getSubjectPredictions, targetPlanner } = require('../controllers/predictionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/sgpa', getSGPA);
router.get('/subject/:subjectId', getSubjectPredictions);
router.post('/target-planner', targetPlanner);

module.exports = router;
