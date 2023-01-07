const api = require("express").Router();

// Mount /employees router
const employees = require("./employees.js");
api.use("/employees", employees);

module.exports = api;
