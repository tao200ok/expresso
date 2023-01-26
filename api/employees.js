const employees = require("express").Router();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
  process.env.TEST_DATABASE || "./database.sqlite"
);

function validate(data, action) {
  if (typeof data === "undefined") {
    return false;
  }
  const { name, position, wage } = data;
  let invalid;
  if (typeof action === "undefined") {
    action = "create";
  }
  switch (action) {
    case "create":
      invalid = !name || !position || !wage;
      break;
    case "update":
      // NOTE: For use in the future with put requests to make all fields optional but require at least one field. Read commented fn call and 'query' in employees.put('/:employeeId', ...).
      invalid = !name && !position && !wage;
      break;
    default:
      throw new Error(
        `'${action}' is not a valid 'action' value. Please try 'create', 'update' or leave it blank to use the default 'create'`
      );
  }
  if (invalid) {
    return false;
  }
  return data;
}

// Retrieve all current Employees
employees.get("/", (req, res, next) => {
  const query = "SELECT * FROM Employee WHERE is_current_employee=1";
  const params = [];
  db.all(query, params, function (err, employees) {
    if (err) {
      return next(err);
    }
    return res.status(200).json({ employees: employees });
  });
});

// Add a new Employee to the database
employees.post("/", (req, res, next) => {
  // Validate received data
  const newEmployee = validate(req.body.employee);
  // Handle incomplete/invalid data
  if (newEmployee === false) {
    return res.status(400).send();
  }

  // Add valid Employee data to db
  const { name, position, wage, isCurrentEmployee } = newEmployee;

  const query = `INSERT INTO Employee(name, position, wage) VALUES($name, $position, $wage)`;
  const params = {
    $name: name,
    $position: position,
    $wage: wage,
    $isCurrentEmployee: isCurrentEmployee,
  };

  db.run(query, params, function (err) {
    if (err) {
      return next(err);
    }

    // Retrieve and send newly created Employee
    const query = `SELECT * FROM Employee WHERE id=${this.lastID}`;
    db.get(query, [], function (err, newEmployee) {
      if (err) {
        return next(err);
      }
      return res.status(201).json({ employee: newEmployee });
    });
  });
});

// Retrieve Employee with id :employeeId from database
employees.param("employeeId", (req, res, next, employeeId) => {
  const query = `SELECT * FROM Employee WHERE id=${employeeId}`;
  db.get(query, [], function (err, employee) {
    if (err) {
      return next(err);
    }

    // Employee with :employeeId not in database
    if (!employee) {
      return res
        .status(404)
        .json({ message: "No employee found with the supplied employeeId" });
    }

    // Attach found artist to request object and proceed
    req.employee = employee;
    next();
  });
});

// Retrieve an Employee
employees.get("/:employeeId", (req, res) => {
  return res.status(200).json({ employee: req.employee });
});

// Update an Employee
employees.put("/:employeeId", (req, res, next) => {
  // Validate employee data recieved in request.
  let updatedEmployee = validate(req.body.employee /*, "update"*/);
  // Handle incomplete employee data.
  if (updatedEmployee === false) {
    return res.status(400).send();
  }

  // Update employee data in database
  const query = `UPDATE Employee SET name=$name, position=$position, wage=$wage WHERE id=$id`;
  // const query = `UPDATE Employee SET ${name ? 'name=$name,' : ''} ${position ? 'position=$position,' : ''} ${wage ? 'wage=$wage' : ''} WHERE id=$id`;

  const { name, position, wage } = updatedEmployee;
  const params = {
    $name: name,
    $position: position,
    $wage: wage,
    $id: req.params.employeeId,
  };
  db.run(query, params, function (err) {
    if (err) {
      return next(err);
    }

    // Retrieve and send newly updated employee
    const query = `SELECT * FROM Employee WHERE id=${req.params.employeeId}`;
    db.get(query, [], function (err, updatedEmployee) {
      if (err) {
        return next(err);
      }
      res.status(200).json({ employee: updatedEmployee });
    });
  });
});

// Change an Employee's employment status
employees.delete("/:employeeId", (req, res, next) => {
  const query = `UPDATE Employee SET is_current_employee=0 WHERE id=$id`;
  const params = { $id: req.params.employeeId };
  db.run(query, params, function (err) {
    if (err) {
      return next(err);
    }

    const query = `SELECT * FROM Employee WHERE id=$id`;
    const params = { $id: req.params.employeeId };
    db.get(query, params, function (err, deletedEmployee) {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ employee: deletedEmployee });
    });
  });
});

// Mount /:employeeId/timesheets router
const timesheets = require("./timesheets");
employees.use("/:employeeId/timesheets", timesheets);

module.exports = employees;
