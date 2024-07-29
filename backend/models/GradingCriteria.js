const mongoose = require('mongoose');

const gradingCriteriaSchema = new mongoose.Schema({
  A: { type: Number, required: true, default: 85 },
  A_minus: { type: Number, required: true, default: 80 },
  B_plus: { type: Number, required: true, default: 75 },
  B: { type: Number, required: true, default: 71 },
  B_minus: { type: Number, required: true, default: 68 },
  C_plus: { type: Number, required: true, default: 64 },
  C: { type: Number, required: true, default: 60 },
  C_minus: { type: Number, required: true, default: 57 },
  D_plus: { type: Number, required: true, default: 54 },
  D: { type: Number, required: true, default: 50 },
  F: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('GradingCriteria', gradingCriteriaSchema);
