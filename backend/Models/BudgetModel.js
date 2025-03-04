const mongoose = require("mongoose");
const schema = mongoose.Schema;

const budgetSchema = new schema({
  category: {
    type: String,
    required: True,
  },
  amount: {
    type: Number,
    required: True,
  },
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
