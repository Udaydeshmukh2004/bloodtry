const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the AppointmentRequest schema
const AppointmentRequestSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    concern: {
        type: String,
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets to the current date and time
    }
});

// Compile model from schema
const AppointmentRequest = mongoose.models.AppointmentRequest || mongoose.model('AppointmentRequest', AppointmentRequestSchema);

module.exports = AppointmentRequest;
