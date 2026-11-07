const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bloodRequestSchema = new Schema({
    bloodType: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
    },
    urgent: {
        type: String,
    },
    hospitalName: {
        type: String,
    },
    reason: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    bankId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const BloodRequest = mongoose.models.BloodRequest || mongoose.model('BloodRequest', bloodRequestSchema);

module.exports = BloodRequest;
