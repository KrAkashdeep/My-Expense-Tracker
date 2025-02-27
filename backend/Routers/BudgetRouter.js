const { addBudget, getBudget, deleteBudget } = require("../Controllers/BudgetController");

const router = require("express").Router();

router.get("/", getBudget);
router.post("/", addBudget);
router.delete("/:id",deleteBudget);

module.exports = router;
