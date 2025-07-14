const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    standard: { type: String, required: true },
    message: { type: String, required: true },
    comment: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});


const Admission = mongoose.model('Admission', admissionSchema);

module.exports = Admission;

