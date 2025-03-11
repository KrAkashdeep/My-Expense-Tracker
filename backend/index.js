const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./config/db.js");

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", require("./Routers/UserRouter"));
app.use("/transactions", require("./Routers/TransactionRouter"));
app.use("/budgets", require("./Routers/BudgetRouter"));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
