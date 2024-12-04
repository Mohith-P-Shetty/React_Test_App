const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    adminName: { type: String },
    email: { type: String, unique: true },
    passcode: { type: String },
    permission: { type: Boolean },
});

// Export the User model
module.exports = mongoose.model('Admin', adminSchema);
