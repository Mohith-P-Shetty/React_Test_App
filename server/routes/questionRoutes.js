const express = require('express');
const router = express.Router();
const { getQuestionsByPosition, getQuestionById } = require('../controllers/questionController'); // Adjust path

// Route for fetching questions by position
router.get('/:position', getQuestionsByPosition);
router.get('/:questionId', getQuestionById);

module.exports = router;
