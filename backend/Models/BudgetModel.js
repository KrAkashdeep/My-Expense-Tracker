const mongoose = require("mongoose");

const schema = mongoose.Schema;

const budgetSchema = new schema({
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
