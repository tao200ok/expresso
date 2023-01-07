const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database.sqlite");

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS Employee", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Dropped an existing Employee table");
  });
  db.run(
    "CREATE TABLE `Employee`(`id` INTEGER NOT NULL, `name` TEXT NOT NULL, `position` TEXT NOT NULL, `wage` INTEGER NOT NULL, `is_current_employee` INTEGER DEFAULT 1, PRIMARY KEY(`id`))",
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Created new Employee table");
    }
  );
});

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS Timesheet", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Dropped an existing Timesheet table");
  });
  db.run(
    "CREATE TABLE `Timesheet`(`id` INTEGER NOT NULL, `hours` INTEGER NOT NULL, `rate` INTEGER NOT NULL, `date` INTEGER NOT NULL, `employee_id` INTEGER NOT NULL, PRIMARY KEY(`id`), FOREIGN KEY(`employee_id`) REFERENCES Employee(`id`))",
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Created new Timesheet table");
    }
  );
});

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS Menu", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Dropped an existing Menu table");
  });
  db.run(
    "CREATE TABLE `Menu`(`id` INTEGER NOT NULL, `title` TEXT NOT NULL, PRIMARY KEY(`id`))",
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Created new Menu table");
    }
  );
});

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS MenuItem", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Dropped an existing MenuItem table");
  });
  db.run(
    "CREATE TABLE `MenuItem`(`id` INTEGER NOT NULL, `name` TEXT NOT NULL, `description` TEXT, `inventory` INTEGER NOT NULL, `price` INTEGER NOT NULL, `menu_id` INTEGER NOT NULL, PRIMARY KEY(`id`), FOREIGN KEY(`menu_id`) REFERENCES Menu(`id`))",
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Created new MenuItem table");
    }
  );
});
