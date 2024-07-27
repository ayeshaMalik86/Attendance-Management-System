// backend/models/routes/attendance.js

const express = require('express');
const router = express.Router();
const Attendance = require('../../models/Attendance'); // Ensure this path is correct
const User = require('../../models/User'); // Ensure the path is correct

// Check if attendance has been marked for today
router.get('/check', async (req, res) => {
  console.log('Received request to check attendance');
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const today = new Date().toISOString().split('T')[0];
    console.log(`Checking attendance for user: ${userId} on date: ${today}`);
    const attendance = await Attendance.findOne({ userId: userId, date: today });

    if (attendance) {
      console.log('Attendance already marked for today');
      res.json({ message: 'Attendance already marked for today' });
    } else {
      console.log('No attendance marked for today');
      res.json({ message: 'You can mark attendance for today' });
    }
  } catch (err) {
    console.error('Error checking attendance:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Mark attendance for today
router.post('/mark', async (req, res) => {
  console.log('Received request to mark attendance');
  try {
    const userId = req.body.userId;
    const today = new Date().toISOString().split('T')[0];
    console.log(`Marking attendance for user: ${userId} on date: ${today}`);
    const existingAttendance = await Attendance.findOne({ userId: userId, date: today });

    if (existingAttendance) {
      console.log('Attendance already marked for today, cannot mark again');
      return res.status(400).json({ error: 'Attendance already marked for today' });
    }

    const newAttendance = new Attendance({
      userId: userId,
      date: today,
      timestamp: new Date()
    });

    await newAttendance.save();
    console.log('Attendance marked successfully');
    res.json({ message: 'Attendance marked successfully!' });
  } catch (err) {
    console.error('Error marking attendance:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch attendance records with username
router.get('/records', async (req, res) => {
  console.log('Received request to fetch attendance records');
  try {
    const userId = req.query.userId;
    console.log('User ID received:', userId);
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Fetch the username of the user
    const user = await User.findById(userId).select('username');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const username = user.username;

    // Fetch all records for the user and append the username
    const records = await Attendance.find({ userId: userId });
    const recordsWithUsername = records.map(record => ({
      ...record.toObject(),
      username: username
    }));

    console.log(`Fetched ${recordsWithUsername.length} attendance records for user: ${userId}`);
    res.json(recordsWithUsername);
  } catch (err) {
    console.error('Error fetching attendance records:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
