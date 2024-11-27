const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    candidateName: { type: String },
    gender: { type: String },
    email: { type: String, unique: true },
    contactNo: { type: String },
    registrationDate: { type: Date, default: Date.now },
    source: { type: String },
    qualifications: { type: String },
    stream: { type: String },
    yearOfPassing: { type: Number },
    jobAppliedFor: { type: String },
    test: { type: String },
    payment: { type: Boolean, default: false },
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
