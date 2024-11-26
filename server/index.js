//index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Test = require('./models/testModel');


const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT;


const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true // Enable cookies and other credentials if needed
}));

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// test to see if i can add data to the database
app.post('/add-test', (req, res) => {
  const { name, age } = req.body; // Get data from the request body

  const newTest = new Test({ name, age }); // Create a new document with the received data

  newTest.save()  // Save the new document to the database
    .then(() => {
      res.status(201).send('Data added successfully');
    })
    .catch((error) => {
      res.status(400).send('Error adding data: ' + error);
    });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});