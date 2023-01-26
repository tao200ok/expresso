const timesheets = require("express").Router({ mergeParams: true });
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
  process.env.TEST_DATABASE || "./database.sqlite"
);

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

module.exports = timesheets;
