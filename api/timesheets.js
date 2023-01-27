const timesheets = require("express").Router({ mergeParams: true });
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
  process.env.TEST_DATABASE || "./database.sqlite"
);
const { validate } = require("./utils");

timesheets.get("/", (req, res, next) => {
  const query = `SELECT * FROM Timesheet WHERE employee_id=$employeeId`;
  const params = {
    $employeeId: req.params.employeeId,
  };
  db.all(query, params, function (err, timesheets) {
    if (err) {
      return next(err);
    }
    return res.status(200).json({ timesheets: timesheets });
  });
});

timesheets.post("/", (req, res, next) => {
  // Validate received data
  const newTimesheet = validate(req.body.timesheet, ["hours", "rate", "date"]);

  // Handle incomplete/invalid data
  if (newTimesheet === false) {
    return res.status(400).send();
  }

  // Add valid Employee data to db
  const query =
    "INSERT INTO Timesheet(hours, rate, date, employee_id) VALUES($hours, $rate, $date, $employeeId)";
  const { hours, rate, date } = newTimesheet;
  const params = {
    $hours: hours,
    $rate: rate,
    $date: date,
    $employeeId: req.params.employeeId,
  };
  db.run(query, params, function (err) {
    if (err) {
      return next(err);
    }

    // Retrieve and send newly created Employee
    const query = `SELECT * FROM Timesheet WHERE id=${this.lastID}`;
    db.get(query, [], function (err, newTimesheet) {
      if (err) {
        return next(err);
      }
      return res.status(201).json({ timesheet: newTimesheet });
    });
  });
});

module.exports = timesheets;
