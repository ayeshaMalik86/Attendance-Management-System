const express = require('express');
const router = express.Router();
const Leave = require('../../models/Leave');

// Request leave
router.post('/request', async (req, res) => {
  console.log('Received request to request leave');
  console.log('Request body:', req.body);  // Log the request body
  try {
    const { userId, leaveType, startDate, endDate } = req.body;

    // Validate request body
    if (!userId || !leaveType || !startDate || !endDate) {
      console.log('Validation failed: All fields are required');
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check for existing pending leave requests for the user
    const existingPendingLeave = await Leave.findOne({ userId, status: 'pending' });
    if (existingPendingLeave) {
      console.log('Validation failed: User already has a pending leave request');
      return res.status(400).json({ error: 'You already have a pending leave request' });
    }

    // Create new leave document
    const newLeave = new Leave({
      userId,
      leaveType,
      startDate,
      endDate,
      status: 'pending' // Ensure this matches the enum values
    });

    // Save to database
    await newLeave.save();
    console.log('Leave requested successfully');
    res.json({ message: 'Leave requested successfully' });
  } catch (err) {
    console.error('Error requesting leave:', err); // Log full error object
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Check leave status
router.get('/status', async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required to check status' });
  }
  try {
    const leaves = await Leave.find({ userId });
    if (leaves.length === 0) {
      return res.json({ message: 'No leave requests found', leaves: [] });
    }
    res.json({ message: 'Leave requests found', leaves });
  } catch (err) {
    console.error('Error checking leave status:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
