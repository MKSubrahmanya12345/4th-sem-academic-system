const express = require('express');
const { getConfig, updateMaintenanceMode } = require('../controllers/configController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/maintenance', getConfig);
router.put('/maintenance', admin, updateMaintenanceMode);

module.exports = router;
