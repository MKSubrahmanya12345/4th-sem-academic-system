const mongoose = require('mongoose');

// ??$$$ Global System Configuration for features like Maintenance Mode
const globalConfigSchema = new mongoose.Schema({
    // Only one global config document should exist, managed by an admin user.
    // This userId is for traceability of who last updated it.
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Must be set by an admin user
    },
    maintenanceMode: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('GlobalConfig', globalConfigSchema);
