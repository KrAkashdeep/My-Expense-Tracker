const mongoose = require("mongoose");

const schema = mongoose.Schema;

const budgetSchema = new schema({});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
