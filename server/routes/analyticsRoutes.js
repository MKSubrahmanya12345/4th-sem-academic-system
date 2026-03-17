const express = require('express');
const { getPerformance, getWeakAreas, getMarginalGain } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/performance', getPerformance);
router.get('/weak-areas', getWeakAreas);
router.get('/marginal-gain', getMarginalGain);

module.exports = router;
