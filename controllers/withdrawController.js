const WithdrawalRequest = require("../models/WithdrawalRequest");
const User = require("../models/User");
const Class = require("../models/Class");

// Controller function to handle creating a withdrawal request
exports.createWithdrawalRequest = async (req, res) => {
  const { userId, classId, reason } = req.body;

  try {
    // Validate user and class IDs
    const user = await User.findById(userId);
    const classObj = await Class.findById(classId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (!classObj) {
      return res.status(404).send("Class not found");
    }

    // Create and save withdrawal request
    const request = new WithdrawalRequest({
      user: userId,
      class: classId,
      reason,
    });
    await request.save();

    res.status(201).send("Withdrawal request saved successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving withdrawal request");
  }
};
