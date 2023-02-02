# Project: Expresso

An internal system management tool for a coffee shop called Expresso.

## End-point: Read all employees

Retrieves all current employees in the system.

### Method: GET

> ```
> {{baseUrl}}/employees
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Accept       | application/json |

### Response: 200

```json
{
  "employees": [
    {
      "id": 1,
      "name": "Employee 1",
      "position": "Employee",
      "wage": 10,
      "is_currently_employed": 1
    },
    {
      "id": 2,
      "name": "Employee 2",
      "position": "Manager",
      "wage": 20,
      "is_currently_employed": 1
    }
  ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Add new employee

Creates a new employee in the system using data supplied in the request body.

### Method: POST

> ```
> {{baseUrl}}/employees
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Accept       | application/json |

### Body (**raw**)

```json
{
  "employee": {
    "name": "New Employee",
    "position": "Employee",
    "wage": 50
  }
}
```

### Response: 201

```json
{
  "employee": {
    "id": 3,
    "name": "New Employee",
    "position": "Employee",
    "wage": 30,
    "is_currently_employed": 1
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Read an employee

Retrieves an employee's information from the system using the supplied employeeId.

### Method: GET

> ```
> {{baseUrl}}/employees/:employeeId
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Accept       | application/json |

### Response: 200

```json
{
  "employee": {
    "id": 1,
    "name": "Employee 1",
    "position": "Employee",
    "wage": 10,
    "is_currently_employed": 1
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update an employee

Updates an employee's information in the system using data from the request body and supplied employeeId.

### Method: PUT

> ```
> {{baseUrl}}/employees/:employeeId
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Accept       | application/json |

### Body (**raw**)

```json
{
  "employee": {
    "name": "Updated Employee",
    "position": "Updated Position",
    "wage": 150
  }
}
```

### Response: 200

```json
{
  "employee": {
    "id": 3,
    "name": "Updated Employee",
    "position": "Updated Position",
    "wage": 150,
    "is_currently_employed": 1
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Remove an employee

Sets an employee in the system as not currently employed using the supplied employeeId.

### Method: DELETE

> ```
> {{baseUrl}}/employees/:employeeId
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Accept       | application/json |

### Response: 200

```json

```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Read an employee's timesheets

Retrieves all timesheet data related to an employee using the supplied employeeId.

### Method: GET

> ```
> {{baseUrl}}/employees/:employeeId/timesheets
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Accept       | application/json |

### Response: 200

```json
{
  "timesheets": [
    {
      "id": 1,
      "hours": 10,
      "rate": 15.5,
      "date": 1506100907820,
      "employeeId": 1
    },
    {
      "id": 2,
      "hours": 20,
      "rate": 15.5,
      "date": 1506100907821,
      "employeeId": 1
    }
  ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Add a new timesheet

Adds a new timesheet to the system using data supplied in the request body. Added data is linked to an employee using the supplied employeeId.

### Method: POST

> ```
> {{baseUrl}}/employees/:employeeId/timesheets
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Accept       | application/json |

### Body (**raw**)

```json
{
  "timesheet": {
    "hours": 10,
    "rate": 15.5,
    "date": 1506100907820
  }
}
```

### Response: 201

```json
{
  "timesheet": {
    "id": 3,
    "hours": 10,
    "rate": 15.5,
    "date": 1506100907820,
    "employeeId": 1
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update a timesheet

Updates a timesheet related to an employee using the supplied timesheetId and employeeId.

### Method: PUT

> ```
> {{baseUrl}}/employees/:employeeId/timesheets/:timesheetId
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Accept       | application/json |

### Body (**raw**)

```json
{
  "timesheet": {
    "hours": 11,
    "rate": 15.5,
    "date": 1506100907820
  }
}
```

### Response: 200

```json
{
  "timesheet": {
    "id": 1,
    "hours": 11,
    "rate": 15.5,
    "date": 1506100907820,
    "employeeId": 1
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Remove a timesheet

Permanently removes a timesheet from the system using the supplied employeeId and timesheetId.

### Method: DELETE

> ```
> {{baseUrl}}/employees/:employeeId/timesheets/:timesheetId
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Accept       | application/json |

### Response: 204

```json

```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Read all menus

Retrieves all menus in the system.

### Method: GET

> ```
> {{baseUrl}}/menus
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Accept       | application/json |

### Response: 200

```json
{
  "menus": [
    {
      "id": 1,
      "title": "Menu 1"
    },
    {
      "id": 2,
      "title": "Menu 2"
    }
  ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Add new menu

Creates a new menu in the system with the data supplied in the request body.

### Method: POST

> ```
> {{baseUrl}}/menus
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Accept       | application/json |

### Body (**raw**)

```json
{
  "menu": {
    "title": "New Menu"
  }
}
```

### Response: 201

```json
{
  "menu": {
    "id": 3,
    "title": "New Menu"
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Read a menu

Retrieves a menu's information from the system using the supplied menuId.

### Method: GET

> ```
> {{baseUrl}}/menus/:menuId
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Accept       | application/json |

### Response: 200

```json
{
  "menu": {
    "id": 1,
    "title": "Menu 1"
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update a menu

Updates a menu's information in the system using the supplied menuId.

### Method: PUT

> ```
> {{baseUrl}}/menus/:menuId
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Accept       | application/json |

### Body (**raw**)

```json
{
  "menu": {
    "title": "Updated Title"
  }
}
```

### Response: 200

```json
{
  "menu": {
    "id": 3,
    "title": "Updated Title"
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Remove a menu

Permanently removes a menu from the system using the supplied menuId.

### Method: DELETE

> ```
> {{baseUrl}}/menus/:menuId
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Accept       | application/json |

### Response: 204

```json

```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Read a menu's items

Retrieves all items in a menu using the supplied menuId.

### Method: GET

> ```
> {{baseUrl}}/menus/:menuId/menu-items
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Accept       | application/json |

### Response: 200

```json
{
  "menu items": [
    {
      "id": 1,
      "name": "Item 1",
      "description": "An item on the menu",
      "inventory": 5,
      "price": 2.5,
      "menuId": 1
    },
    {
      "id": 2,
      "name": "Item 2",
      "description": "Another item on the menu",
      "inventory": 10,
      "price": 2,
      "menuId": 1
    }
  ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Add a new menu item

Adds a new item to the system using the data supplied in the request body. Created item is linked to a menu using the supplied menuId.

### Method: POST

> ```
> {{baseUrl}}/menus/:menuId/menu-items
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Accept       | application/json |

### Body (**raw**)

```json
{
  "menuItem": {
    "name": "New item",
    "description": "Tasty new menu item",
    "inventory": 10,
    "price": 2.5
  }
}
```

### Response: 201

```json
{
  "menuItem": {
    "id": 3,
    "name": "New item",
    "description": "Tasty new menu item",
    "inventory": 10,
    "price": 2.5,
    "menuId": 1
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update a menu item

Updates a menu item's information on the system using the supplied menuItemId and menuId.

### Method: PUT

> ```
> {{baseUrl}}/menus/:menuId/menu-items/:menuItemId
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Accept       | application/json |

### Body (**raw**)

```json
{
  "menuItem": {
    "name": "Updated item",
    "description": "Updated item description",
    "inventory": 10,
    "price": 2.5
  }
}
```

### Response: 200

```json
{
  "menuItem": {
    "id": 3,
    "name": "New item",
    "description": "Updated item description",
    "inventory": 10,
    "price": 2.5,
    "menuId": 1
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Remove a menu item

Permanently removes an item from a menu in the system using the supplied menuId and menuItemId.

### Method: DELETE

> ```
> {{baseUrl}}/menus/:menuId/menu-items/:menuItemId
> ```

### Headers

| Content-Type | Value            |
| ------------ | ---------------- |
| Accept       | application/json |

### Response: 204

```json

```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

---

Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
