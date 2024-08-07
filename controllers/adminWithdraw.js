// controllers/adminController.js
const WithdrawalRequest = require('../models/WithdrawalRequest');
const Class = require('../models/Class');
const User = require('../models/User');

exports.processWithdrawalRequest = async (req, res) => {
  const { requestId, action } = req.body; // action can be 'approve' or 'reject'

  if (!requestId || !action) {
    return res.status(400).json({ message: 'Request ID and action are required.' });
  }

  try {
    const request = await WithdrawalRequest.findById(requestId).populate('class user');
    if (!request) {
      return res.status(404).json({ message: 'Withdrawal request not found.' });
    }

    if (action === 'approve') {
      // Update request status
      request.status = 'approved';
      request.processedAt = new Date();
      await request.save();

      // Remove user from the class
      const classDoc = await Class.findById(request.class._id);
      classDoc.enrolledStudents = classDoc.enrolledStudents.filter(student => !student.equals(request.user._id));
      await classDoc.save();
      
      return res.status(200).json({ message: 'Withdrawal request approved and user removed from class.' });
    } else if (action === 'reject') {
      request.status = 'rejected';
      request.processedAt = new Date();
      await request.save();
      
      return res.status(200).json({ message: 'Withdrawal request rejected.' });
    } else {
      return res.status(400).json({ message: 'Invalid action.' });
    }
  } catch (error) {
    console.error("Error processing withdrawal request:", error);
    res.status(500).json({ message: 'An error occurred while processing the request.' });
  }
};
