const mongoose = require('mongoose');

// ??$$$ Subject Component Schema to handle different types of evaluations
const subjectComponentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Component name is required'],
        trim: true
    },
    maxMarks: {
        type: Number,
        required: [true, 'Maximum marks for component is required'],
        min: 0
    },
    weight: {
        type: Number,
        required: [true, 'Weight for component is required'],
        min: 0,
        max: 1 // Represented as a percentage, e.g., 0.25 for 25%
    },
    type: {
        type: String,
        enum: ['exam', 'task', 'lab', 'project', 'quiz', 'assignment', 'other'],
        default: 'exam'
    },
    isDone: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date
    }
}, { _id: false });

// ??$$$ Subject Schema supporting dynamic academic structures
const subjectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    semesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Subject name is required'],
        trim: true,
        minlength: 1
    },
    credits: {
        type: Number,
        required: [true, 'Subject credits are required'],
        min: 0
    },
    components: [subjectComponentSchema]
}, {
    timestamps: true
});

// Cascade delete marks when a subject is deleted
subjectSchema.pre('remove', async function(next) {
    await this.model('Marks').deleteMany({ subjectId: this._id });
    // Also remove this subject's reference from its parent semester
    await this.model('Semester').updateOne(
        { _id: this.semesterId },
        { $pull: { subjects: this._id } }
    );
    next();
});

module.exports = mongoose.model('Subject', subjectSchema);
