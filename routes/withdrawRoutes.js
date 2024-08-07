const express = require("express");
const router = express.Router();
const withdrawalController = require("../controllers/withdrawController");

// Define route for creating a withdrawal request
router.post("/withdraw", withdrawalController.createWithdrawalRequest);

module.exports = router;
