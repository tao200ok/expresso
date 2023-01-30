const menuItems = require("express").Router({ mergeParams: true });
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
  process.env.TEST_DATABASE || "./database.sqlite"
);
const { validate } = require("./utils");

menuItems.get("/", (req, res, next) => {
  let query = `SELECT * FROM MenuItem WHERE menu_id=${req.params.menuId}`;
  db.all(query, [], function (err, menuItems) {
    if (err) {
      return next(err);
    }
    return res.status(200).json({ menuItems: menuItems });
  });
});

menuItems.post("/", (req, res, next) => {
  // Validate recieved data
  const newMenuItem = validate(req.body.menuItem, [
    "name",
    "description",
    "inventory",
    "price",
  ]);

  // Handle incomplete/invalid data
  if (newMenuItem === false) {
    return res.status(400).send();
  }

  // Add valid Item data to db
  let query = `INSERT INTO MenuItem(name, description, inventory, price, menu_id) VALUES($name, $description, $inventory, $price, $menuId)`;
  const { name, description, inventory, price } = newMenuItem;
  let params = {
    $name: name,
    $description: description,
    $inventory: inventory,
    $price: price,
    $menuId: req.params.menuId,
  };
  db.run(query, params, function (err) {
    if (err) {
      return next(err);
    }

    // Retrieve and send newly created Menu Item
    query = `SELECT * FROM MenuItem WHERE id=${this.lastID}`;
    db.get(query, [], function (err, menuItem) {
      if (err) {
        return next(err);
      }
      return res.status(201).json({ menuItem: menuItem });
    });
  });
});

module.exports = menuItems;
