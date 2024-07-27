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
      status: 'pending'
    });

    // Save to database
    await newLeave.save();
    console.log('Leave requested successfully');
    res.json({ message: 'Leave requested successfully' });
  } catch (err) {
    console.error('Error requesting leave:', err);
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
    res.json({ message: 'Leave requests found', leaves });
  } catch (err) {
    console.error('Error checking leave status:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Get all leave requests
router.get('/requests', async (req, res) => {
  try {
    const leaves = await Leave.find().populate('userId', 'username');
    res.json({ message: 'Leave requests fetched successfully', leaves });
  } catch (err) {
    console.error('Error fetching leave requests:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Get all pending leave requests
router.get('/requests/pending', async (req, res) => {
  try {
    const leaves = await Leave.find({ status: 'pending' }).populate('userId', 'username');
    res.json({ message: 'Pending leave requests fetched successfully', leaves });
  } catch (err) {
    console.error('Error fetching pending leave requests:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Approve or reject leave request
router.patch('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate status
  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const leave = await Leave.findByIdAndUpdate(id, { status }, { new: true });
    if (!leave) {
      return res.status(404).json({ error: 'Leave request not found' });
    }
    console.log(`Leave request with ID ${id} updated to ${status}`);
    res.json({ message: 'Leave request updated successfully', leave });
  } catch (err) {
    console.error('Error updating leave request:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
