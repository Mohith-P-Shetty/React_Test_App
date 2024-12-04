const express = require("express");
const {
    createResult,
    getResults,
    getResultById,
    deleteResult,
} = require("../controllers/resultController");

const router = express.Router();

// Route to create a new result
router.post("/create", createResult);

// Route to fetch results by filters
router.get("/fetch", getResults);

// Route to fetch a single result by resultid
router.get("/:resultid", getResultById);

// Route to delete a result by resultid
router.delete("/delete/:resultid", deleteResult);

module.exports = router;
