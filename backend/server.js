const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./models/routes/auth'); // Correct path
const attendanceRoutes = require('./models/routes/attendance'); // Correct path
const leaveRoutes = require('./models/routes/leave');
const userRoutes = require('./models/routes/user'); // Correct path
const gradingRoutes = require('./models/routes/grading');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/user', userRoutes); 
app.use('/api/grading', gradingRoutes)

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
