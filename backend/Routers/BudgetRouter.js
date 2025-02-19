const { addBudget, getBudget } = require("../Controllers/BudgetController");

const router = require("express").Router();

router.get("/", getBudget);
router.post("/", addBudget);

module.exports = router;
