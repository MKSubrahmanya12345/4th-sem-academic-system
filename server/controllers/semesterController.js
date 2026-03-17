const Semester = require('../models/Semester');
const Subject = require('../models/Subject');

// @desc    Get all semesters
// @route   GET /api/v1/semesters
// @access  Private
exports.getSemesters = async (req, res, next) => {
  try {
    const semesters = await Semester.find({ userId: req.user.id }).populate('subjects');
    res.status(200).json({ success: true, count: semesters.length, data: semesters });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single semester
// @route   GET /api/v1/semesters/:id
// @access  Private
exports.getSemester = async (req, res, next) => {
  try {
    const semester = await Semester.findById(req.params.id).populate('subjects');
    if (!semester) return res.status(404).json({ success: false, message: 'Semester not found' });
    if (semester.userId.toString() !== req.user.id) return res.status(401).json({ success: false, message: 'Not authorized' });
    
    res.status(200).json({ success: true, data: semester });
  } catch (error) {
    next(error);
  }
};

// @desc    Create semester
// @route   POST /api/v1/semesters
// @access  Private
exports.createSemester = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    const semester = await Semester.create(req.body);
    res.status(201).json({ success: true, data: semester });
  } catch (error) {
    next(error);
  }
};

// @desc    Update semester
// @route   PUT /api/v1/semesters/:id
// @access  Private
exports.updateSemester = async (req, res, next) => {
  try {
    let semester = await Semester.findById(req.params.id);
    if (!semester) return res.status(404).json({ success: false, message: 'Semester not found' });
    if (semester.userId.toString() !== req.user.id) return res.status(401).json({ success: false, message: 'Not authorized' });

    semester = await Semester.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: semester });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete semester
// @route   DELETE /api/v1/semesters/:id
// @access  Private
exports.deleteSemester = async (req, res, next) => {
  try {
    const semester = await Semester.findById(req.params.id);
    if (!semester) return res.status(404).json({ success: false, message: 'Semester not found' });
    if (semester.userId.toString() !== req.user.id) return res.status(401).json({ success: false, message: 'Not authorized' });

    await semester.deleteOne();
    res.status(200).json({ success: true, message: 'Semester deleted' });
  } catch (error) {
    next(error);
  }
};
