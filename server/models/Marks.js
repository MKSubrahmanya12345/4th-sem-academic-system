const mongoose = require('mongoose');

// ??$$$ Marks Schema for tracking performance across subject components
const marksSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    componentName: { // Must match a name in Subject.components
        type: String,
        required: [true, 'Component name for marks is required'],
        trim: true
    },
    obtainedMarks: {
        type: Number,
        required: [true, 'Obtained marks are required'],
        min: 0
    }
}, {
    timestamps: true
});

// Ensure a user can only have one mark entry for a specific component within a subject
marksSchema.index({ userId: 1, subjectId: 1, componentName: 1 }, { unique: true });

module.exports = mongoose.model('Marks', marksSchema);
