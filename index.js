require("dotenv").config();

const { PORT } = process.env;

const cors = require("cors");
const express = require("express");
const { dbConnection } = require("./database/config");
const { router: routerUser } = require("./routes/user");
const { router: routerAuth } = require("./routes/auth");

const app = express();

// MIDDLEWARES
// cors
app.use(cors());
// Read and body parsing
app.use(express.json());

// Database
dbConnection();

// Routes
app.use("/api/users", routerUser);
app.use("/api/login", routerAuth);

// Init server

app.listen(PORT, () => {
  console.log("Running server...");
});
