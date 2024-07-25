const mongoose = require('mongoose'); // Import mongoose

const LeaveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  leaveType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], // Enum values
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now },
});

const Leave = mongoose.model('Leave', LeaveSchema);
module.exports = Leave;
