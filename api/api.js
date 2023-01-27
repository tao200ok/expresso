const api = require("express").Router();

// Mount /employees router
const employees = require("./employees.js");
api.use("/employees", employees);

// Mount /menus router
const menus = require("./menus.js");
api.use("/menus", menus);

module.exports = api;
