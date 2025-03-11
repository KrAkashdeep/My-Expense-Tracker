const {
  addBudget,
  getBudget,
  deleteBudget,
} = require("../Controllers/BudgetController");
const { protect } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get("/", protect, getBudget);
router.post("/", protect, addBudget);
router.delete("/:id", protect, deleteBudget);

module.exports = router;
