const express = require('express');
const { addTestData } = require('../controllers/testController');

const router = express.Router();

router.post('/add-test', addTestData);

module.exports = router;
