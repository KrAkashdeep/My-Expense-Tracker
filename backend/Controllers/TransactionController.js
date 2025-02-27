const TransactionModel = require("../Models/TransactionModel");

const addTransaction = async (req, res) => {
  try {
    const { description, amount, date, category, type } = req.body;
    const transaction = new TransactionModel({
      description,
      amount,
      date,
      category,
      type,
    });

    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: "Error creating transaction" });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await TransactionModel.find();
    res.status(200).json({
      message: "All transactions fetched successfully",
      sucess: true,
      transactions,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to get all transactions", sucess: false });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params.id;
    await TransactionModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Transaction deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction" });
  }
};

module.exports = { addTransaction, getAllTransactions, deleteTransaction };
