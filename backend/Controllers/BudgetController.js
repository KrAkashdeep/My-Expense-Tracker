const BudgetModel = require("../Models/BudgetModel");

const addBudget = async (req, res) => {
  try {
    const { category, amount } = req.body;
    const budget = new BudgetModel({
      user: req.user._id,
      category,
      amount,
    });
    const saveBudget = await budget.save();
    res.status(201).json(saveBudget);
  } catch (error) {
    res.status(500).json({ message: "Error creating budget" });
  }
};

const getBudget = async (req, res) => {
  try {
    const budget = await BudgetModel.find({ user: req.user._id });
    res
      .status(200)
      .json({ message: "Budget fetched successfully", success: true, budget });
  } catch (error) {
    res.status(500).json({ message: "Error fetching budget" });
  }
};

const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if budget belongs to user
    const budget = await BudgetModel.findById(id);

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    // Make sure user owns budget
    if (budget.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await BudgetModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Budget deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error deleting budget" });
  }
};

module.exports = { addBudget, getBudget, deleteBudget };
