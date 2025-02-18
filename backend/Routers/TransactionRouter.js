const {
  getAllTransactions,
  addTransaction,
} = require("../Controllers/TransactionController");

const router = require("express").Router();

router.get("/", getAllTransactions);
router.post("/", addTransaction);

module.exports = router;
