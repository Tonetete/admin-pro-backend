require("dotenv").config();

const { PORT } = process.env;

const path = require("path");
const cors = require("cors");
const express = require("express");
const { dbConnection } = require("./database/config");
const { router: routerUser } = require("./routes/user");
const { router: routerAuth } = require("./routes/auth");
const { router: routerHospital } = require("./routes/hospital");
const { router: routerDoctor } = require("./routes/doctor");
const { router: routerSearch } = require("./routes/search");
const { router: routerUpload } = require("./routes/upload");

const app = express();

// MIDDLEWARES
// cors
app.use(cors());
// Read and body parsing
app.use(express.json());

// Database
dbConnection();

// Public directory
app.use(express.static("public"));

// Routes
app.use("/api/users", routerUser);
app.use("/api/hospitals", routerHospital);
app.use("/api/doctors", routerDoctor);
app.use("/api/search", routerSearch);
app.use("/api/login", routerAuth);
app.use("/api/upload", routerUpload);

app.get("*", (req, res) => {
  res.sendFile(path(__dirname, "public/index.html")); // to redirect defautl routes to index.html you don't lose track of angular routes
});

// Init server

app.listen(PORT, () => {
  console.log("Running server...");
});
