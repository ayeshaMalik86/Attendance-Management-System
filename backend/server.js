const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./models/routes/auth'); // Correct path to auth.js

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Use the routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://afomalik86:haalim123@cluster0.9tcmqrw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
