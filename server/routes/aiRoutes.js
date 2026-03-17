const express = require('express');
const { aiQuery } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/query', aiQuery);

module.exports = router;
