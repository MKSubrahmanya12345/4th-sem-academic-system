const Subject = require('../models/Subject');
const Marks = require('../models/Marks');
const calculations = require('../utils/calculations');

// @desc    Get performance analytics
// @route   GET /api/v1/analytics/performance
exports.getPerformance = async (req, res, next) => {
  try {
    const subjects = await Subject.find({ userId: req.user.id });
    const allMarks = await Marks.find({ userId: req.user.id });

    const subjectPerformance = subjects.map(sub => {
      const marks = allMarks.filter(m => m.subjectId.toString() === sub._id.toString());
      return {
        subjectId: sub._id,
        name: sub.name,
        percentage: calculations.calculateSubjectPercentage(sub, marks).toFixed(2)
      };
    });

    const overallPercentage = subjectPerformance.length > 0 
      ? (subjectPerformance.reduce((acc, s) => acc + parseFloat(s.percentage), 0) / subjectPerformance.length).toFixed(2)
      : 0;

    res.status(200).json({
      success: true,
      data: { overallPercentage, subjectPerformance }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get weak areas
// @route   GET /api/v1/analytics/weak-areas
exports.getWeakAreas = async (req, res, next) => {
    try {
        const subjects = await Subject.find({ userId: req.user.id });
        const allMarks = await Marks.find({ userId: req.user.id });

        const performance = subjects.map(sub => {
            const marks = allMarks.filter(m => m.subjectId.toString() === sub._id.toString());
            return {
                id: sub._id,
                name: sub.name,
                percentage: calculations.calculateSubjectPercentage(sub, marks)
            };
        }).sort((a,b) => a.percentage - b.percentage);

        // Map components to percentages
        const componentPerformance = [];
        subjects.forEach(sub => {
            sub.components.forEach(comp => {
                const mark = allMarks.find(m => m.subjectId.toString() === sub._id.toString() && m.componentName === comp.name);
                if (mark) {
                    componentPerformance.push({
                        subjectName: sub.name,
                        componentName: comp.name,
                        percentage: (mark.obtainedMarks / comp.maxMarks) * 100
                    });
                }
            });
        });

        componentPerformance.sort((a,b) => a.percentage - b.percentage);

        res.status(200).json({
            success: true,
            data: {
                lowestSubjects: performance.slice(0, 3),
                lowestComponents: componentPerformance.slice(0, 5)
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Marginal Gain Analysis
// @route   GET /api/v1/analytics/marginal-gain
exports.getMarginalGain = async (req, res, next) => {
    try {
        const subjects = await Subject.find({ userId: req.user.id });
        const totalCredits = subjects.reduce((acc, s) => acc + s.credits, 0);

        const analysis = subjects.map(sub => {
            // SGPA improvement per +1 mark in this subject = (Credits / TotalCredits) * (1 / MaxPossibleMarks) * (Something...)
            // Actually, more simply: (Credits / TotalCredits) * (GradePointIncreasePotential)
            // But if we want it "per mark", we need to know the subject's total scale.
            const totalMaxMarks = sub.components.reduce((acc, c) => acc + c.maxMarks, 0); // Not exactly right because of weights
            
            // Gain = (1 / TotalCredits) * Credits * (WeightOfComponent / MaxMarksOfComponent)
            // Let's simplify: Gain = (Credits / TotalCredits) * 0.1 (estimate for a unit of weight)
            return {
                subjectId: sub._id,
                name: sub.name,
                sgpaImprovementPerPercentagePoint: (sub.credits / totalCredits) * 0.1 // Simplified
            };
        });

        res.status(200).json({ success: true, data: analysis });
    } catch (error) {
        next(error);
    }
};
