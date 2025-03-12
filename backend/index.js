const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./config/db.js");

// Configure CORS - Allow all origins for mobile compatibility
app.use(
  cors({
    origin: "https://expense-tracker-sigma-nine-80.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);

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
