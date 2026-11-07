const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bloodbankSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        min: 10,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    apos: {
        type: Number,
        min: 5,
    },
    abpos: {
        type: Number,
        min: 5,
    },
    bpos: {
        type: Number,
        min: 5,
    },
    opos: {
        type: Number,
        min: 5,
    },
    aneg: {
        type: Number,
        min: 5,
    },
    abneg: {
        type: Number,
        min: 5,
    },
    bneg: {
        type: Number,
        min: 5,
    },
    oneg: {
        type: Number,
        min: 5,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Bloodbank = mongoose.models.bloodbanks || mongoose.model('bloodbanks', bloodbankSchema);

module.exports = Bloodbank;
