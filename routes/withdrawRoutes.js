// routes/withdrawalRoutes.js

const express = require("express");
const router = express.Router();
const withdrawalController = require("../controllers/withdrawController");

router.post("/withdraw", withdrawalController.addWithdrawalRequest);
router.get("/withdraw", withdrawalController.getAllWithdrawalRequests);
router.post("/:requestId/approve", withdrawalController.approveRequest);
router.post("/:requestId/reject", withdrawalController.rejectRequest);

module.exports = router;
