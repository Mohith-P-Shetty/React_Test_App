const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    resultid: {
        type: String,
        required: true,
        unique: true, // Ensure result ID is unique
    },
    userid: {
        type: String,
        required: true,
    },
    testid: {
        type: String,
        required: true,
    },
    date: {
        type: String, // Store date as a string in YYYY-MM-DD format
        required: true,
    },
    time: {
        type: String, // Store time as a string in HH:MM:SS format
        required: true,
    },
    attendedQuestions: [
        {
            questionId: { type: String, required: true }, // Question ID
            type: { type: String, required: true }, // Question type (e.g., Analytical, Logical, etc.)
            selectedOption: { type: mongoose.Schema.Types.Mixed, default: null }, // Selected option(s)
        },
    ],
    score: {
        type: Number,
        default: 0, // Default score is 0
    },
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
