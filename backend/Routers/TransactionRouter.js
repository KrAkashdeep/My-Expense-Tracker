const {
  getAllTransactions,
  addTransaction,
  deleteTransaction,
} = require("../Controllers/TransactionController");
const { protect } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get("/", protect, getAllTransactions);
router.post("/", protect, addTransaction);
router.delete("/:id", protect, deleteTransaction);

module.exports = router;
