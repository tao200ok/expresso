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

timesheets.param("timesheetId", (req, res, next, timesheetId) => {
  const query = `SELECT * FROM Timesheet WHERE id=${timesheetId}`;
  db.get(query, [], function (err, timesheet) {
    if (err) {
      return next(err);
    }

    // Timesheet with provided timesheetId not in database
    if (!timesheet) {
      return res.status(404).json({ message: "No timesheet with that id" });
    }

    // Attach timesheet to the request object and proceed
    req.timesheet = timesheet;
    next();
  });
});

timesheets.put("/:timesheetId", (req, res, next) => {
  // Validate recieved data
  const updatedTimesheet = validate(req.body.timesheet, [
    "hours",
    "rate",
    "date",
  ]);

  // Handle incomplete timesheet data
  if (updatedTimesheet === false) {
    return res.status(400).send();
  }

  // Update employee data in database
  const query = `UPDATE Timesheet SET hours=$hours, rate=$rate, date=$date WHERE id=$id`;
  const { hours, rate, date } = updatedTimesheet;
  const params = {
    $hours: hours,
    $rate: rate,
    $date: date,
    $id: req.params.timesheetId,
  };
  db.run(query, params, function (err) {
    if (err) {
      return next(err);
    }

    // Retrieve and send newly updated employee
    const query = `SELECT * FROM Timesheet WHERE id=${req.params.timesheetId}`;
    db.get(query, [], function (err, updatedTimesheet) {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ timesheet: updatedTimesheet });
    });
  });
});

timesheets.delete("/:timesheetId", (req, res, next) => {
  const query = `DELETE FROM Timesheet WHERE id=${req.params.timesheetId}`;
  db.run(query, [], function (err) {
    if (err) {
      return next(err);
    }

    return res.status(204).send();
  });
});

module.exports = timesheets;
