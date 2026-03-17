/**
 * ??$$$ Core academic calculation logic (SGPA, percentages, predictions)
 */

// Mapping of percentage to grade points
const getGradePoint = (percentage) => {
    if (percentage >= 90) return 10;
    if (percentage >= 80) return 9;
    if (percentage >= 70) return 8;
    if (percentage >= 60) return 7;
    if (percentage >= 50) return 6;
    if (percentage >= 45) return 5;
    if (percentage >= 40) return 4;
    return 0;
};

// Calculate percentage for a single subject based on obtained marks
const calculateSubjectPercentage = (subject, marks) => {
    let totalWeight = 0;
    let totalObtainedWeighted = 0;

    subject.components.forEach(comp => {
        const markEntry = marks.find(m => m.componentName === comp.name);
        if (markEntry) {
            const componentPercentage = (markEntry.obtainedMarks / comp.maxMarks);
            totalObtainedWeighted += (componentPercentage * comp.weight);
            totalWeight += comp.weight;
        }
    });

    if (totalWeight === 0) return 0;
    // Normalize to 100% based on components attempted
    return (totalObtainedWeighted / totalWeight) * 100;
};

// Prediction: Optimistic (Remaining components = 100%)
const predictOptimistic = (subject, marks) => {
    let currentWeighted = 0;
    let realizedWeight = 0;

    subject.components.forEach(comp => {
        const markEntry = marks.find(m => m.componentName === comp.name);
        if (markEntry) {
            currentWeighted += (markEntry.obtainedMarks / comp.maxMarks) * comp.weight;
            realizedWeight += comp.weight;
        } else {
            // Assume 100% for future components
            currentWeighted += 1.0 * comp.weight;
        }
    });

    return currentWeighted * 100;
};

// Prediction: Performance-Based (Remaining components = Current average)
const predictPerformanceBased = (subject, marks) => {
    let currentWeighted = 0;
    let realizedWeight = 0;

    subject.components.forEach(comp => {
        const markEntry = marks.find(m => m.componentName === comp.name);
        if (markEntry) {
            currentWeighted += (markEntry.obtainedMarks / comp.maxMarks) * comp.weight;
            realizedWeight += comp.weight;
        }
    });

    if (realizedWeight === 0) return 0;
    const currentAvg = currentWeighted / realizedWeight;
    
    // Fill remaining weight with current average
    const totalPredicted = currentWeighted + (currentAvg * (1 - realizedWeight));
    return totalPredicted * 100;
};

// Prediction: Weighted Recency (Weights recent marks more)
const predictWeightedRecency = (subject, marks) => {
    if (marks.length === 0) return 0;
    
    // Sort marks by update date to find 'recency'
    const sortedMarks = [...marks].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
    let currentWeighted = 0;
    let realizedWeight = 0;
    
    // For prediction, we use the most recent mark's performance as a strong indicator
    const mostRecentMark = sortedMarks[0];
    const subjectComp = subject.components.find(c => c.name === mostRecentMark.componentName);
    const recentPerformance = mostRecentMark.obtainedMarks / subjectComp.maxMarks;

    subject.components.forEach(comp => {
        const markEntry = marks.find(m => m.componentName === comp.name);
        if (markEntry) {
            currentWeighted += (markEntry.obtainedMarks / comp.maxMarks) * comp.weight;
            realizedWeight += comp.weight;
        }
    });

    // 70% current average, 30% recent performance for remaining
    const currentAvg = realizedWeight > 0 ? (currentWeighted / realizedWeight) : 0;
    const predictedFuturePerf = (currentAvg * 0.7) + (recentPerformance * 0.3);
    
    const totalPredicted = currentWeighted + (predictedFuturePerf * (1 - realizedWeight));
    return totalPredicted * 100;
};

// Calculate SGPA
const calculateSGPA = (subjects, allMarks) => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    subjects.forEach(subject => {
        const marks = allMarks.filter(m => m.subjectId.toString() === subject._id.toString());
        const percentage = calculateSubjectPercentage(subject, marks);
        const gp = getGradePoint(percentage);
        
        totalGradePoints += (gp * subject.credits);
        totalCredits += subject.credits;
    });

    if (totalCredits === 0) return 0;
    return totalGradePoints / totalCredits;
};

// Target Planner Solver
const solveForRequiredMarks = (subject, marks, targetPercentage) => {
    let currentWeighted = 0;
    let realizedWeight = 0;

    subject.components.forEach(comp => {
        const markEntry = marks.find(m => m.componentName === comp.name);
        if (markEntry) {
            currentWeighted += (markEntry.obtainedMarks / comp.maxMarks) * comp.weight;
            realizedWeight += comp.weight;
        }
    });

    const targetDecimal = targetPercentage / 100;
    const remainingWeight = 1 - realizedWeight;
    
    if (remainingWeight <= 0) {
        return { possible: currentWeighted >= targetDecimal, requiredAvg: 0 };
    }

    const requiredRemainingWeighted = targetDecimal - currentWeighted;
    const requiredAvg = requiredRemainingWeighted / remainingWeight;

    return {
        possible: requiredAvg <= 1,
        requiredAvg: Math.max(0, requiredAvg * 100),
        remainingWeight: remainingWeight * 100
    };
};

module.exports = {
    getGradePoint,
    calculateSubjectPercentage,
    predictOptimistic,
    predictPerformanceBased,
    predictWeightedRecency,
    calculateSGPA,
    solveForRequiredMarks
};
