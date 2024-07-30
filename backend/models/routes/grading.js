const express = require('express');
const router = express.Router();
const GradingCriteria = require('../GradingCriteria'); // Ensure this path is correct

const defaultGradingCriteria = {
  A: 85,
  A_minus: 80,
  B_plus: 75,
  B: 71,
  B_minus: 68,
  C_plus: 64,
  C: 60,
  C_minus: 57,
  D_plus: 54,
  D: 50,
  F: 0
};

// Get grading criteria
router.get('/grading-criteria', async (req, res) => {
  try {
    let criteria = await GradingCriteria.findOne();
    if (!criteria) {
      criteria = await GradingCriteria.create(defaultGradingCriteria);
    }
    const criteriaObject = criteria.toObject();
    delete criteriaObject._id;
    res.json(criteriaObject);
  } catch (err) {
    console.error('Error fetching grading criteria:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update grading criteria
router.put('/grading-criteria', async (req, res) => {
  try {
    const newCriteria = req.body;
    const criteria = await GradingCriteria.findOneAndUpdate({}, newCriteria, { new: true, upsert: true });
    const criteriaObject = criteria.toObject();
    delete criteriaObject._id;
    res.json(criteriaObject);
  } catch (err) {
    console.error('Error updating grading criteria:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
