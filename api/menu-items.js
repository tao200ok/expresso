const menuItems = require("express").Router({ mergeParams: true });
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
  process.env.TEST_DATABASE || "./database.sqlite"
);

menuItems.get("/", (req, res, next) => {
  let query = `SELECT * FROM MenuItem WHERE menu_id=${req.params.menuId}`;
  db.all(query, [], function (err, menuItems) {
    if (err) {
      return next(err);
    }
    return res.status(200).json({ menuItems: menuItems });
  });
});

module.exports = menuItems;
