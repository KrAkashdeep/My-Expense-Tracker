const mongoose = require("mongoose");
const schema = mongoose.Schema;

const transactionSchema = new schema({
  date: {
    type: Date,
    default: Date.now,
    // required: true,
  },
  description: {
    type: String,
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
  type: {
    type: String,
    required: true,
  },
});

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction;
