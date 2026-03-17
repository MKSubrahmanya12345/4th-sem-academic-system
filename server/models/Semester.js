const mongoose = require('mongoose');

// ??$$$ Dynamic Semester Schema for managing academic terms
const semesterSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Semester name is required'],
        trim: true,
        minlength: 1
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }]
}, {
    timestamps: true
});

// Cascade delete subjects when a semester is deleted
semesterSchema.pre('remove', async function(next) {
    await this.model('Subject').deleteMany({ semesterId: this._id });
    next();
});

module.exports = mongoose.model('Semester', semesterSchema);
