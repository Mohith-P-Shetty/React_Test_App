const Test = require('../models/testModel');

const addTestData = async (req, res) => {
    try {
        const { name, age } = req.body; // Get data from the request body
        const newTest = new Test({ name, age }); // Create a new document
        await newTest.save(); // Save it to the database
        res.status(201).send('Data added successfully');
    } catch (error) {
        res.status(400).send('Error adding data: ' + error.message);
    }
};

module.exports = { addTestData };
