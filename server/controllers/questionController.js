const Question = require('../models/questionModel'); // Adjust the path as needed

// Fetch all questions for a specific position
const getQuestionsByPosition = async (req, res) => {
    try {
        const { position } = req.params; // Extract position from URL parameters

        // Validate the position value
        if (!["Software Engineer", "Data Analyst", "Product Manager"].includes(position)) {
            return res.status(400).json({ error: "Invalid position specified" });
        }

        // Fetch questions from the database for the given position
        const questions = await Question.find({ position });



        if (questions.length === 0) {
            return res.status(404).json({ message: `No questions found for position: ${position}` });
        }

        res.status(200).json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
const getQuestionById = async (req, res) => {
    try {
        const { questionId } = req.params;

        if (!questionId) {
            return res.status(400).json({ error: "questionId is required" });
        }

        const question = await Question.findOne({ questionId });
        if (!question) {
            return res.status(404).json({ error: `No question found with ID: ${questionId}` });
        }

        res.status(200).json(question);
    } catch (error) {
        console.error("Error fetching question by ID:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getQuestionsByPosition,
    getQuestionById,
};
