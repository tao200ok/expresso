const employees = require("express").Router();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
  process.env.TEST_DATABASE || "./database.sqlite"
);

function validate(data) {
  const { name, position, wage } = data;
  if (!name || !position || !wage) {
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

  const query = `INSERT INTO Employee(name, position, wage${
    isCurrentEmployee ? ", is_current_employee" : ""
  }) VALUES($name, $position, $wage${
    isCurrentEmployee ? ", $isCurrentEmployee" : ""
  })`;
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
      return res.status(404).send();
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

employees.put("/:employeeId", (req, res, next) => {
  // Validate employee data recieved in request.
  let updatedEmployee = validate(req.body.employee);
  // Handle incomplete employee data.
  if (updatedEmployee === false) {
    return res.status(400).send();
  }

  // Update employee data in database
  const query = `UPDATE Employee SET name=$name, position=$position, wage=$wage WHERE id=$id`;

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

module.exports = employees;
