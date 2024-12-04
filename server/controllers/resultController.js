const Result = require("../models/resultModel");

// Create a new result
const createResult = async (req, res) => {
    try {
        const { userid, testid, date, time, attendedQuestions, score } = req.body;

        // Generate resultid
        const resultid = `${userid}_${testid}`;

        // Create and save the result
        const result = new Result({
            resultid,
            userid,
            testid,
            date,
            time,
            attendedQuestions,
            score,
        });

        await result.save();
        res.status(201).json({ message: "Result created successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Error creating result", error: error.message });
    }
};

// Fetch results by filters (dynamic query)
const getResults = async (req, res) => {
    try {
        const { userid, testid, date, score } = req.query;

        // Create dynamic query object
        const query = {};
        if (userid) query.userid = userid;
        if (testid) query.testid = testid;
        if (date) query.date = date;
        if (score) query.score = parseInt(score, 10); // Convert score to integer

        // Fetch results based on query
        const results = await Result.find(query);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: "Error fetching results", error: error.message });
    }
};

// Fetch a single result by resultid
const getResultById = async (req, res) => {
    try {
        const { resultid } = req.params;

        const result = await Result.findOne({ resultid });
        if (!result) {
            return res.status(404).json({ message: "Result not found" });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching result", error: error.message });
    }
};

// Delete a result by resultid
const deleteResult = async (req, res) => {
    try {
        const { resultid } = req.params;

        const result = await Result.findOneAndDelete({ resultid });
        if (!result) {
            return res.status(404).json({ message: "Result not found" });
        }

        res.status(200).json({ message: "Result deleted successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Error deleting result", error: error.message });
    }
};

module.exports = {
    createResult,
    getResults,
    getResultById,
    deleteResult,
};
