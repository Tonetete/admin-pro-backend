require("dotenv").config();

const { PORT } = process.env;

const cors = require("cors");
const express = require("express");
const { dbConnection } = require("./database/config");

const app = express();

// Middlewares
app.use(cors());

// Database
dbConnection();

app.get("/", (req, res) => {
  res.status(400).json({ ok: true, msg: "Hello World!" });
});

app.listen(PORT, () => {
  console.log("Running server...");
});
