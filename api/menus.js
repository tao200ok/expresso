const menus = require("express").Router();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
  process.env.TEST_DATABASE || "./database.sqlite"
);
const { validate } = require("./utils");

menus.get("/", (req, res, next) => {
  const query = "SELECT * FROM Menu";
  db.all(query, [], function (err, menus) {
    if (err) {
      return next(err);
    }
    return res.status(200).json({ menus: menus });
  });
});

menus.post("/", (req, res, next) => {
  // Validate received data
  const newMenu = validate(req.body.menu, ["title"]);

  // Handle incomplete/invalid data
  if (newMenu === false) {
    return res.status(400).send();
  }

  // Add valid Menu data to db
  const query = `INSERT INTO Menu(title) VALUES('${newMenu.title}')`;
  db.run(query, [], function (err) {
    if (err) {
      return next(err);
    }

    // Retrieve and send newly created Employee
    const query = `SELECT * FROM Menu WHERE id=${this.lastID}`;
    db.get(query, [], function (err, newMenu) {
      if (err) {
        return next(err);
      }
      return res.status(201).json({ menu: newMenu });
    });
  });
});

menus.param("menuId", (req, res, next, menuId) => {
  const query = `SELECT * FROM Menu WHERE id=${menuId}`;
  db.get(query, [], function (err, menu) {
    if (err) {
      return next(err);
    }

    if (!menu) {
      return res.status(404).json({ message: "No menu with that id" });
    }

    req.menu = menu;
    return next();
  });
});

menus.get("/:menuId", (req, res) => {
  return res.status(200).json({ menu: req.menu });
});

// Mount /menu-items router
const menuItems = require("./menu-items");
menus.use("/:menuId/menu-items", menuItems);

module.exports = menus;
