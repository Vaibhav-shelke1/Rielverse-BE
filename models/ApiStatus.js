const mongoose = require('mongoose');

const apiStatusSchema = new mongoose.Schema({
    isActive: { type: Boolean, required: true, default: true }, // Default to active
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ApiStatus', apiStatusSchema);