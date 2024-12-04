const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionId: { type: String, required: true, unique: true }, // Unique ID for each question
    position: {
        type: String,
        enum: ["Software Engineer", "Data Analyst", "Product Manager"], // Main divisions of questions
        required: true,
    },
    type: {
        type: String,
        enum: ["Analytical", "Logical", "Coding", "Math"], // Categories of questions
        required: true,
    },
    question: { type: String, required: true }, // The actual question text
    options: {
        type: [String], // Array of possible answers
        validate: {
            validator: function (arr) {
                return arr.length >= 2; // Ensure at least two options
            },
            message: "A question must have at least two options.",
        },
        required: true,
    },
    correctOption: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Ensure correctOption is one of the provided options
                return this.options.includes(value);
            },
            message: "Correct option must be one of the provided options.",
        },
    },
});

module.exports = mongoose.model('Question', questionSchema);
