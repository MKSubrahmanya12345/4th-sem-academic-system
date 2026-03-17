const Subject = require('../models/Subject');
const Semester = require('../models/Semester');

// @desc    Get all subjects for a semester
// @route   GET /api/v1/subjects/semester/:semesterId
// @access  Private
exports.getSubjectsBySemester = async (req, res, next) => {
  try {
    const subjects = await Subject.find({ semesterId: req.params.semesterId, userId: req.user.id });
    res.status(200).json({ success: true, count: subjects.length, data: subjects });
  } catch (error) {
    next(error);
  }
};

// @desc    Create subject
// @route   POST /api/v1/subjects
// @access  Private
exports.createSubject = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    
    // Ensure semester exists and belongs to user
    const semester = await Semester.findById(req.body.semesterId);
    if (!semester) return res.status(404).json({ success: false, message: 'Semester not found' });
    if (semester.userId.toString() !== req.user.id) return res.status(401).json({ success: false, message: 'Not authorized' });

    const subject = await Subject.create(req.body);
    
    // Add subject to semester
    semester.subjects.push(subject._id);
    await semester.save();

    res.status(201).json({ success: true, data: subject });
  } catch (error) {
    next(error);
  }
};

// @desc    Update subject
// @route   PUT /api/v1/subjects/:id
// @access  Private
exports.updateSubject = async (req, res, next) => {
  try {
    let subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ success: false, message: 'Subject not found' });
    if (subject.userId.toString() !== req.user.id) return res.status(401).json({ success: false, message: 'Not authorized' });

    subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: subject });
  } catch (error) {
    next(error);
  }
};

// @desc    Update subject components
// @route   PUT /api/v1/subjects/:id/components
// @access  Private
exports.updateComponents = async (req, res, next) => {
  try {
    let subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ success: false, message: 'Subject not found' });
    if (subject.userId.toString() !== req.user.id) return res.status(401).json({ success: false, message: 'Not authorized' });

    subject.components = req.body.components;
    await subject.save();

    res.status(200).json({ success: true, data: subject });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete subject
// @route   DELETE /api/v1/subjects/:id
// @access  Private
exports.deleteSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ success: false, message: 'Subject not found' });
    if (subject.userId.toString() !== req.user.id) return res.status(401).json({ success: false, message: 'Not authorized' });

    await subject.deleteOne();
    res.status(200).json({ success: true, message: 'Subject deleted' });
  } catch (error) {
    next(error);
  }
};
