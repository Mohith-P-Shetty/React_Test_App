const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const testRoutes = require('./routes/testRoutes');
const userRoutes = require('./routes/userRoutes');// Import routes

dotenv.config(); // Load environment variables

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Enable cookies and other credentials if needed
}));

app.use(express.json()); // Middleware to parse JSON data

// Connect to MongoDB
connectDB();

// Test Route for server status
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Use test routes
app.use('/api/tests', testRoutes);
app.use('/api/users', userRoutes); // User-related routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
