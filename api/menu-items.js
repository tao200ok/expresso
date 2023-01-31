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

menuItems.param("menuItemId", (req, res, next, menuItemId) => {
  const query = `SELECT * FROM MenuItem WHERE id=${menuItemId}`;
  db.get(query, [], function (err, menuItem) {
    if (err) {
      return next(err);
    }

    if (!menuItem) {
      return res.status(404).json({ message: "No menu item with that id" });
    }

    req.menuItem = menuItem;
    return next();
  });
});

menuItems.put("/:menuItemId", (req, res, next) => {
  // Validate recieved data
  const updatedMenuItem = validate(req.body.menuItem, [
    "name",
    "description",
    "inventory",
    "price",
  ]);

  // Handle incomplete/invalid data
  if (updatedMenuItem === false) {
    return res.status(400).send();
  }

  // Update valid Menu Item data in db
  let query = `UPDATE MenuItem SET name=$name, description=$description, inventory=$inventory, price=$price WHERE id=$id`;
  const { name, description, inventory, price } = updatedMenuItem;
  const params = {
    $name: name,
    $description: description,
    $inventory: inventory,
    $price: price,
    $id: req.params.menuItemId,
  };
  db.run(query, params, function (err) {
    if (err) {
      return next(err);
    }

    // Retrieve and send newly updated Menu Item
    query = `SELECT * FROM MenuItem WHERE id=${req.params.menuItemId}`;
    db.get(query, [], function (err, updatedMenuItem) {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ menuItem: updatedMenuItem });
    });
  });
});

menuItems.delete("/:menuItemId", (req, res, next) => {
  const query = `DELETE FROM MenuItem WHERE id=${req.params.menuItemId}`;
  db.run(query, [], function (err) {
    if (err) {
      return next(err);
    }
    return res.status(204).send();
  });
});

module.exports = menuItems;
