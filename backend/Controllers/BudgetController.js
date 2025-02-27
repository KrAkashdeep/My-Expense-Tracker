const BudgetModel = require("../Models/BudgetModel");

const addBudget = async (req, res) => {
  try {
    const { category, amount } = req.body;
    const budget = new BudgetModel({
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
    const budget = await BudgetModel.find();
    res
      .status(200)
      .json({ message: "Budget fetched successfully", success: true, budget });
  } catch (error) {
    res.status(500).json({ message: "Error fetching budget" });
  }
};

const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params.id;
    await BudgetModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Budget deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error deleting budget" });
  }
};

module.exports = { addBudget, getBudget, deleteBudget };
