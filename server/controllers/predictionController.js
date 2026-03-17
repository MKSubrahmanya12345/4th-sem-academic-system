const Subject = require('../models/Subject');
const Marks = require('../models/Marks');
const Semester = require('../models/Semester');
const calculations = require('../utils/calculations');

// @desc    Get SGPA (Current, Projected, Max)
// @route   GET /api/v1/calculations/sgpa
// @access  Private
exports.getSGPA = async (req, res, next) => {
  try {
    const { semesterId } = req.query;
    const userId = req.user.id;

    let query = { userId };
    if (semesterId) query._id = semesterId;

    const semesters = await Semester.find(query).populate('subjects');
    const allSubjects = semesters.flatMap(s => s.subjects);
    const subjectIds = allSubjects.map(s => s._id);
    const allMarks = await Marks.find({ userId, subjectId: { $in: subjectIds } });

    // Current SGPA
    const currentSGPA = calculations.calculateSGPA(allSubjects, allMarks);

    // Projected SGPA (using Performance-Based by default for overall)
    const projectedSubjects = allSubjects.map(sub => {
        const subMarks = allMarks.filter(m => m.subjectId.toString() === sub._id.toString());
        const projectedPercentage = calculations.predictPerformanceBased(sub, subMarks);
        return { ...sub.toObject(), projectedPercentage };
    });
    
    const projectedTotalGP = projectedSubjects.reduce((acc, sub) => 
        acc + (calculations.getGradePoint(sub.projectedPercentage) * sub.credits), 0);
    const totalCredits = projectedSubjects.reduce((acc, sub) => acc + sub.credits, 0);
    const projectedSGPA = totalCredits > 0 ? projectedTotalGP / totalCredits : 0;

    // Max SGPA (Optimistic)
    const optimisticSubjects = allSubjects.map(sub => {
        const subMarks = allMarks.filter(m => m.subjectId.toString() === sub._id.toString());
        const maxPercentage = calculations.predictOptimistic(sub, subMarks);
        return { ...sub.toObject(), maxPercentage };
    });
    const maxTotalGP = optimisticSubjects.reduce((acc, sub) => 
        acc + (calculations.getGradePoint(sub.maxPercentage) * sub.credits), 0);
    const maxSGPA = totalCredits > 0 ? maxTotalGP / totalCredits : 0;

    res.status(200).json({
      success: true,
      data: {
        currentSGPA: currentSGPA.toFixed(2),
        projectedSGPA: projectedSGPA.toFixed(2),
        maxSGPA: maxSGPA.toFixed(2)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get predictions for a subject
// @route   GET /api/v1/predictions/subject/:subjectId
// @access  Private
exports.getSubjectPredictions = async (req, res, next) => {
  try {
    const subject = await Subject.findById(req.params.subjectId);
    if (!subject || subject.userId.toString() !== req.user.id) {
       return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const marks = await Marks.find({ subjectId: req.params.subjectId, userId: req.user.id });

    res.status(200).json({
      success: true,
      data: {
        optimistic: calculations.predictOptimistic(subject, marks).toFixed(2),
        performanceBased: calculations.predictPerformanceBased(subject, marks).toFixed(2),
        weightedRecency: calculations.predictWeightedRecency(subject, marks).toFixed(2),
        current: calculations.calculateSubjectPercentage(subject, marks).toFixed(2)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Target Planner
// @route   POST /api/v1/target-planner
// @access  Private
exports.targetPlanner = async (req, res, next) => {
  try {
    const { subjectId, targetPercentage } = req.body;
    const subject = await Subject.findById(subjectId);
    if (!subject || subject.userId.toString() !== req.user.id) {
       return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const marks = await Marks.find({ subjectId, userId: req.user.id });
    const result = calculations.solveForRequiredMarks(subject, marks, targetPercentage);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
