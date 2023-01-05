const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;

// Logging, Body parsing and CORS middlewares
const logger = require("morgan");
app.use(logger("dev"));

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const errorHandler = require("errorhandler");
app.use(errorHandler());

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
