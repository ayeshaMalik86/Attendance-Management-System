const express = require('express');
const User = require('../User'); // Adjust path if necessary
const router = express.Router();

// Get all users excluding admins
router.get('/', async (req, res) => {
  console.log('Received request for /api/user'); // Debugging statement
  try {
    const users = await User.find({ role: { $ne: 'admin' } }, 'username'); // Exclude admin users
    console.log('Users fetched successfully:', users); // Debugging statement
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err); // Debugging statement
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
