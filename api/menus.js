const menus = require("express").Router();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
  process.env.TEST_DATABASE || "./database.sqlite"
);

menus.get("/", (req, res, next) => {
  const query = "SELECT * FROM Menu";
  db.all(query, [], function (err, menus) {
    if (err) {
      return next(err);
    }
    return res.status(200).json({ menus: menus });
  });
});

// Mount /menu-items router
const menuItems = require("./menu-items");
menus.use("/:menuId/menu-items", menuItems);

module.exports = menus;
