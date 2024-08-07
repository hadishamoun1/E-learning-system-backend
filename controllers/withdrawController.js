// controllers/withdrawalController.js

const Enrollment = require("../models/Enrollment");
const WithdrawalRequest = require("../models/WithdrawalRequest");

exports.approveRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { classId, userId } = req.body;

    // Remove the enrollment
    await Enrollment.findOneAndDelete({ user: userId, class: classId });
    await WithdrawalRequest.findByIdAndDelete(requestId);
    // Other approval logic if needed
    res
      .status(200)
      .json({ message: "Request approved and enrollment removed." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.rejectRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await WithdrawalRequest.findByIdAndUpdate(
      requestId,
      { status: "rejected", processedAt: Date.now() },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Withdrawal request not found" });
    }
    await WithdrawalRequest.findByIdAndDelete(requestId);
    res
      .status(200)
      .json({ message: "Withdrawal request rejected. User remains enrolled." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to reject withdrawal request", error });
  }
};
// controllers/withdrawalController.js

// Function to get all withdrawal requests
exports.getAllWithdrawalRequests = async (req, res) => {
  try {
    const requests = await WithdrawalRequest.find()
      .populate("user", "name")
      .populate("class", "title");
    res.json(requests);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch withdrawal requests", error: err });
  }
};

exports.addWithdrawalRequest = async (req, res) => {
  const { userId, classId, reason } = req.body;

  try {
    const newRequest = new WithdrawalRequest({
      user: userId,
      class: classId,
      reason
    });

    await newRequest.save();
    res.status(201).json({ message: "Withdrawal request added successfully", newRequest });
  } catch (error) {
    res.status(500).json({ message: "Failed to add withdrawal request", error });
  }
};