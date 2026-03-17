const Marks = require('../models/Marks');
const Subject = require('../models/Subject');

// @desc    Upsert mark entry
// @route   POST /api/v1/marks
// @access  Private
exports.upsertMark = async (req, res, next) => {
  try {
    const { subjectId, componentName, obtainedMarks } = req.body;
    const userId = req.user.id;

    // Validate subject ownership
    const subject = await Subject.findById(subjectId);
    if (!subject || subject.userId.toString() !== userId) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    // Check if component exists in subject
    const component = subject.components.find(c => c.name === componentName);
    if (!component) {
      return res.status(400).json({ success: false, message: `Component ${componentName} not found in subject` });
    }

    // Validate marks
    if (obtainedMarks > component.maxMarks) {
      return res.status(400).json({ success: false, message: `Marks cannot exceed max marks (${component.maxMarks})` });
    }

    const mark = await Marks.findOneAndUpdate(
      { userId, subjectId, componentName },
      { obtainedMarks },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: mark });
  } catch (error) {
    next(error);
  }
};

// @desc    Bulk upsert marks for a subject
// @route   POST /api/v1/marks/bulk
// @access  Private
exports.bulkUpsertMarks = async (req, res, next) => {
  try {
    const { subjectId, marks } = req.body;
    const userId = req.user.id;

    const subject = await Subject.findById(subjectId);
    if (!subject || subject.userId.toString() !== userId) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const operations = marks.map(m => ({
      updateOne: {
        filter: { userId, subjectId, componentName: m.componentName },
        update: { obtainedMarks: m.obtainedMarks },
        upsert: true
      }
    }));

    await Marks.bulkWrite(operations);

    const updatedMarks = await Marks.find({ userId, subjectId });
    res.status(200).json({ success: true, data: updatedMarks });
  } catch (error) {
    next(error);
  }
};

// @desc    Get marks for a subject
// @route   GET /api/v1/marks/subject/:subjectId
// @access  Private
exports.getMarksBySubject = async (req, res, next) => {
  try {
    const marks = await Marks.find({ subjectId: req.params.subjectId, userId: req.user.id });
    res.status(200).json({ success: true, count: marks.length, data: marks });
  } catch (error) {
    next(error);
  }
};
