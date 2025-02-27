const {
  getAllTransactions,
  addTransaction,
  deleteTransaction,
} = require("../Controllers/TransactionController");

const router = require("express").Router();

router.get("/", getAllTransactions);
router.post("/", addTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
