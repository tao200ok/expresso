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

menus.put("/:menuId", (req, res, next) => {
  // Validate recieved data
  const updatedMenu = validate(req.body.menu, ["title"]);

  // Handle incomplete/invalid data
  if (updatedMenu === false) {
    return res.status(400).send();
  }

  // Update employee data in database
  const query = "UPDATE Menu SET title=$title WHERE id=$id";
  const { title } = updatedMenu;
  const params = {
    $title: title,
    $id: req.params.menuId,
  };
  db.run(query, params, function (err) {
    if (err) {
      return next(err);
    }

    // Retrieve and send newly updated employee
    const query = `SELECT * FROM Menu WHERE id=${req.params.menuId}`;
    db.get(query, [], function (err, updatedMenu) {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ menu: updatedMenu });
    });
  });
});

menus.delete("/:menuId", (req, res, next) => {
  const { menuId } = req.params;
  // First check that menu has no related items
  let query = `SELECT * FROM MenuItem WHERE menu_id=${menuId}`;
  db.all(query, [], function (err, menuItems) {
    if (err) {
      return next(err);
    }

    if (menuItems.length > 0) {
      return res
        .status(400)
        .json({ message: "You must remove all menu items first" });
    } else {
      // Then proceed to delete menu with no items
      query = `DELETE FROM Menu WHERE id=${menuId}`;
      db.run(query, [], function (err) {
        if (err) {
          return next(err);
        }
        return res.status(204).send();
      });
    }
  });
});

// Mount /menu-items router
const menuItems = require("./menu-items");
menus.use("/:menuId/menu-items", menuItems);

module.exports = menus;
