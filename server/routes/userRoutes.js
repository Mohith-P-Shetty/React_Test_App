const express = require('express');
const { registerUser, getUsers } = require('../controllers/userController');

const router = express.Router();

// Route to register a user
router.post('/register', registerUser);

// Route to fetch all users
router.get('/all', getUsers);

module.exports = router;
