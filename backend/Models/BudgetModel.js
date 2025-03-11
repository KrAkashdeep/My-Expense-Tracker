const mongoose = require("mongoose");
const schema = mongoose.Schema;

const budgetSchema = new schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
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
