const menus = require("express").Router();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
  process.env.TEST_DATABASE || "./database.sqlite"
);

// Mount /menu-items router
const menuItems = require("./menu-items");
menus.use("/:menuId/menu-items", menuItems);

module.exports = menus;
