const mongoose = require('mongoose');

// ??$$$ Calendar Event Schema for academic scheduling and deadlines
const eventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Event title is required'],
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'Event date is required']
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: false // Optional, an event might not be tied to a specific subject
    },
    type: {
        type: String,
        enum: ['exam', 'deadline', 'task', 'lecture', 'other'],
        default: 'other'
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
