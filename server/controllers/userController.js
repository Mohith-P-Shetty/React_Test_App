const User = require('../models/UsersModel');

// Add a new user
const registerUser = async (req, res) => {
    try {
        const {
            candidateName,
            gender,
            email,
            contactNumber,
            source,
            college,
            qualification,
            stream,
            yearOfPassing,
            jobAppliedFor,
            test,
            payment,
        } = req.body;

        // Create a new User document
        const newUser = new User({
            candidateName,
            gender,
            email,
            contactNumber,
            source,
            college,
            qualification,
            stream,
            yearOfPassing,
            jobAppliedFor,
            test,
            payment,
        });

        await newUser.save(); // Save the user to the database
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

// Fetch all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all users
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser, getUsers };
