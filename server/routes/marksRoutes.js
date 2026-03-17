const express = require('express');
const { upsertMark, bulkUpsertMarks, getMarksBySubject } = require('../controllers/marksController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/', upsertMark);
router.post('/bulk', bulkUpsertMarks);
router.get('/subject/:subjectId', getMarksBySubject);

module.exports = router;
