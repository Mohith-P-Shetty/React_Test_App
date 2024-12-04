const Admin = require('../models/adminModel');

const findAdmin = async (req, res) => {
    try {
        const { email } = req.query; // Assume the email is passed as a query parameter

        if (!email) {
            return res.status(400).json({ error: "Email is required to find the admin" });
        }

        const admin = await Admin.findOne({ email }); // Find a admin by email

        if (!admin) {
            return res.status(404).json({ message: "admin not found" });
        }

        res.status(200).json(admin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { findAdmin };