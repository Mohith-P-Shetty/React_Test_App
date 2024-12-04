const express = require('express');
const { registerUser, getUsers, findUser } = require('../controllers/userController');

const router = express.Router();

// Route to register a user
router.post('/register', registerUser);

// Route to fetch all users
router.get('/all', getUsers);

// Route to fetxh one user 
router.post('/find', findUser);

module.exports = router;
