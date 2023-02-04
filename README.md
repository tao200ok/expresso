# **Project: Expresso**

Expresso is an internal system management tool for a coffee shop. It can also be adapted for businesses with similar structures.

Use this documentation to test and play with this API on your local machine.

## **Set it up**

This guide assumes that you have [node](https://nodejs.org) and [npm](https://npmjs.com) already installed.

1. To install the project's dependencies, run this command in the terminal:

```
npm install
```

2. Then, start the server on your machine. Run:

```
node server.js
```

3. If all goes well, you will get a feedback in the terminal that  
   "Server is listening on port 4000"  
   Good, you can now get to work.

## **Authorization**

All the requests in the current version can be run without any authorization.

## **Endpoints**

### <ins>**EMPLOYEES**</ins>

### 1. _Read all employees_

Retrieves all current employees in the system.

#### **Request:**

<span style="color: green">GET `http://localhost:4000/api/employees`

#### **Responses:**

##### 200:

Request was successful. Response body will contain an 'employees' property with an array of objects, each representing individual employees. See the example below.

Employee:

| Property            | Description                   | Type    | Read-only |
| ------------------- | ----------------------------- | ------- | --------- |
| id                  | Unique identifier             | integer | yes       |
| name                | Full name                     | string  | no        |
| position            | Position or Role              | string  | no        |
| wage                | Total wages earned in dollars | integer | no        |
| is_current_employee |                               | integer | yes       |

Example:

```json
"body": {
  . . .

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

##### 500: [Click here to see more](#res_500).

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

### 2. _Add a new employee_

Creates a new employee in the system using data supplied in the request body.

#### **Request:**

<span style="color: yellow">POST</span> `http://localhost:4000/api/employees`

#### Body (raw):

The request body should contain an 'employee' property with data for the new employee. See the example.  
The request will fail with a 400 response code if the employee object or ANY of its required properties are missing.

Employee:

| Property | Description                   | Type    | Required |
| -------- | ----------------------------- | ------- | -------- |
| name     | Full name                     | string  | yes      |
| position | Position or Role              | string  | yes      |
| wage     | Total wages earned in dollars | integer | yes      |

Example:

```json
"body": {
  . . .

  "employee": {
    "name": "New Employee",
    "position": "Employee",
    "wage": 50
  }
}
```

#### **Responses:**

##### 201:

Request successful. The employee was added and the response body's 'employee' property will contain the newly added data, as it is in the system. See the example.

Example:

```json
"body": {
  . . .

  "employee": {
    "id": 3,
    "name": "New Employee",
    "position": "Employee",
    "wage": 50,
    "is_currently_employed": 1
  }
}
```

##### 400:

[Click here to see more](#res_400).

##### 500:

[Click here to see more](#res_500).

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

### 3. _Read an employee_

Retrieves an employee's information from the system using their employeeId.

#### **Request:**

<span style="color: green">GET</span> `http://localhost:4000/api/employees/:employeeId`

> NOTE: employeeId is required for this request.

#### **Responses:**

##### 200:

Request successful. Response body's 'employee' property will contain the retrieved employee information. See the example.  
Example:

```json
"body": {
  . . .

  "employee": {
    "id": 1,
    "name": "Employee 1",
    "position": "Employee",
    "wage": 10,
    "is_currently_employed": 1
  }
}
```

##### 404:

[Click here to see more](#res_404).

##### 500:

[Click here to see more](#res_500).

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

### 4. _Update an employee_

Updates an employee's information in the system using data from the request body and their employeeId.

#### **Request:**

<span style="color: blue">PUT</span> `http://localhost:4000/api/employees/:employeeId`

> NOTE: employeeId is required for this request.

#### Body (**raw**)

The request body should contain an 'employee' property with the proposed update. See the example.  
The request will fail with a 400 response code if the employee object or ANY of its required properties are missing.

Employee:

| Property | Description                   | Type    | Required |
| -------- | ----------------------------- | ------- | -------- |
| name     | Full name                     | string  | yes      |
| position | Position or Role              | string  | yes      |
| wage     | Total wages earned in dollars | integer | yes      |

Example:

```json
"body": {
  . . .

  "employee": {
    "name": "Updated Employee",
    "position": "Updated Position",
    "wage": 150
  }
}
```

#### **Responses:**

##### 200:

Request successful. The employee was updated in the system and the response body's 'employee' property will contain the updated data. See the example.

```json
"body": {
  . . .

  "employee": {
    "id": 3,
    "name": "Updated Employee",
    "position": "Updated Position",
    "wage": 150,
    "is_currently_employed": 1
  }
}
```

##### 404:

##### 400:

##### 500:

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

### 5. _Remove an employee_

This does not permanently remove an employee's records but instead marks them in the system as not a current employee using their employeeId and retains the employee's data for record keeping. Subsequent GET requests for all current employees won't include this employee in its response.

#### **Request:**

<span style="color: red">DELETE</span> `http://localhost:4000/api/employees/:employeeId`

> NOTE: employeeId is required for this request.

#### **Responses:**

##### 200:

Successfully removed the employee.

##### 404:

##### 500:

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

### <ins>**TIMESHEETS**</ins>

### 1. _Read an employee's timesheets_

Retrieves all timesheet data related to an employee using their employeeId.

#### **Request:**

<span style="color: green">GET</span> `http://localhost:4000/api/employees/:employeeId/timesheets`

> NOTE: employeeId is required for this request.

#### **Responses:**

##### 200:

Request successful. Response body will contain a 'timesheets' property with an array of objects, each representing individual timesheet data. See the example.

Timesheet:

| Property    | Description                                | Type    | Read-only |
| ----------- | ------------------------------------------ | ------- | --------- |
| id          | Timesheet's unique identifier              | integer | yes       |
| hours       | Number of hours worked                     | integer | no        |
| rate        | Pay earned per hour of work in $/hour      | integer | no        |
| date        | Date the work was done in the format '...' | integer | no        |
| employee_id | Identifier for the related employee        | integer | yes       |

Example:

```json
"body": {
  . . .

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

##### 404:

##### 500:

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

### 2. _Add a new timesheet_

Adds new timesheet data to the system using data provided in the request body. Added data is linked to an employee using their employeeId in the request path.

#### **Request:**

<span style="color: yellow">POST</span> `http://localhost:4000/api/employees/:employeeId/timesheets`

> NOTE: employeeId is required for this request.

#### Body (**raw**)

The request body should contain data for the new timesheet in the 'timesheet' property. See the example.  
The request will fail with a 400 response code if the timesheet object or ANY of its required properties are missing.

Timesheet:

| Property | Description                                | Type    | Required |
| -------- | ------------------------------------------ | ------- | -------- |
| hours    | Number of hours worked                     | integer | yes      |
| rate     | Pay earned per hour of work in $/hour      | integer | yes      |
| date     | Date the work was done in the format '...' | integer | yes      |

Example:

```json
"body": {
  . . .

  "timesheet": {
    "hours": 10,
    "rate": 15.5,
    "date": 1506100907820
  }
}
```

### **Responses**:

#### 201:

Request successful. New timesheet data was added to the system and the response body's 'timesheet' property will contain the added data. See the example.

```json
"body": {
  . . .

  "timesheet": {
    "id": 3,
    "hours": 10,
    "rate": 15.5,
    "date": 1506100907820,
    "employeeId": 1
  }
}
```

##### 400:

##### 404:

##### 500:

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

### 3. _Update a timesheet_

Updates timesheet data related to an employee with data provided in the request body, using its timesheetId and their employeeId respectively.

#### **Request:**

<span style="color: blue">PUT</span> `http://localhost:4000/api/employees/:employeeId/timesheets/:timesheetId`

> NOTE: Both employeeId and timesheetId are required for this request.

#### Body (**raw**)

The request body should contain a 'timesheet' property with data for the proposed update. See the example.  
The request will fail with a 400 response code if the timesheet object or ANY of its required properties are missing.

Timesheet:

| Property | Description                                | Type    | Required |
| -------- | ------------------------------------------ | ------- | -------- |
| hours    | Number of hours worked                     | integer | yes      |
| rate     | Pay earned per hour of work in $/hour      | integer | yes      |
| date     | Date the work was done in the format '...' | integer | yes      |

Example:

```json
"body": {
  . . .

  "timesheet": {
    "hours": 11,
    "rate": 15.5,
    "date": 1506100907820
  }
}
```

#### **Responses:**

##### 200:

Request successful. The timesheet was updated in the system and the response body will contain the updated data in the 'timesheet' property. See the example.

```json
"body": {
  . . .

  "timesheet": {
    "id": 1,
    "hours": 11,
    "rate": 15.5,
    "date": 1506100907820,
    "employeeId": 1
  }
}
```

##### 400:

##### 404:

##### 500:

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

### 4. _Remove a timesheet_

Permanently removes timesheet data from the system using its timesheetId.

> <span style="color: #bb0000">WARNING:</span> This action is irreversible.

#### **Request:**

<span style="color: #ff0000">DELETE</span> `http://localhost:4000/api/employees/:employeeId/timesheets/:timesheetId`

> NOTE: Both employeeId and timesheetId are required for this request.

#### **Responses:**

##### 204:

Successfully removed the timesheet.

##### 404:

##### 500:

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

### <ins>**MENUS**</ins>

### 1. _Read all menus_

Retrieves all menus in the system.

#### **Request:**

<span style="color: green">GET</span> `http://localhost:4000/api/menus`

#### **Responses:**

##### 200:

Request successful. Response body will contain a 'menus' property with an array of objects, each representing individual menus. See the example.

> NOTE: If there are no menus in the system, the array in the response will be an empty array.

Menu:

| Property | Description              | Type    | Read-only |
| -------- | ------------------------ | ------- | --------- |
| id       | Menu's unique identifier | integer | yes       |
| title    | A short title            | string  | no        |

Example:

```json
"body": {
  . . .

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

##### 500:

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

### 2. _Add new menu_

Creates a new menu in the system with the data from the request body.

#### **Request:**

#### <span style="color: yellow">POST</span> `http://localhost:4000/api/menus`

#### Body (**raw**)

The request body should contain data for the new menu in the 'menu' property. See the example.  
The request will fail with a 400 response code if the menu object or any of its required properties are missing.

Menu:

| Property | Description   | Type   | Required |
| -------- | ------------- | ------ | -------- |
| Title    | A short title | string | yes      |

Example:

```json
"body": {
  . . .

  "menu": {
    "title": "New Menu"
  }
}
```

#### **Responses:**

##### 201:

Request successful. The new menu was added to the system and the response body will contain the added data in the 'menu' property. See the example.

Example:

```json
"body": {
  . . .

  "menu": {
    "id": 3,
    "title": "New Menu"
  }
}
```

##### 400:

##### 500:

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

### 3. _Read a menu_

Retrieves a menu's information from the system using its menuId.

#### **Request:**

<span style="color: green">GET</span> `http://localhost:4000/api/menus/:menuId`

> NOTE: menuId is required for this request.

#### **Responses:**

##### 200:

Request successful. Response body will contain the retrieved menu information in the 'menu' property. See the example.

Example:

```json
"body": {
  . . .

  "menu": {
    "id": 1,
    "title": "Menu 1"
  }
}
```

##### 404:

##### 500:

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

### 4. _Update a menu_

Updates a menu's information in the system using its menuId.

#### **Request:**

<span style="color: blue">PUT</span> `http://localhost:4000/api/menus/:menuId`

> NOTE: menuId is required for this request.

#### Body (**raw**)

The request body should contain a 'menu' property with data for the proposed update. See the example.  
The request will fail with a 400 response code if the menu object or any of its required properties are missing.

Menu:

| Property | Description   | Type   | Required |
| -------- | ------------- | ------ | -------- |
| Title    | A short title | string | yes      |

Example:

```json
"body": {
  . . .

  "menu": {
    "title": "Updated Title"
  }
}
```

#### **Response:**

##### 200:

Request successful. The menu was updated in the system and the response body will contain the updated data in the 'menu' property. See the example.

Example:

```json
"body": {
  . . .

  "menu": {
    "id": 3,
    "title": "Updated Title"
  }
}
```

##### 400:

##### 404:

##### 500:

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

### 5. _Remove a menu_

Permanently removes a menu from the system using its menuId, if that menu has no related items. It fails with a 400 response code if any related items remains. All related menu items must first be [removed](#remove_menu).

> NOTE: menuId is required for this request.

#### **Request:**

<span style="color: red">DELETE</span> `http://localhost:4000/api/menus/:menuId`

#### **Responses:**

##### 204:

Successfully removed the menu.

##### 404:

##### 500:

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

### <ins>**MENU ITEMS**</ins>

### 1. _Read a menu's items_

Retrieves all items in a menu using its menuId.

#### **Request:**

<span style="color: green">GET<span> `http://localhost:4000/api/menus/:menuId/menu-items`

> NOTE: menuId is required for this request.

#### **Responses:**

##### 200:

Request successful. Response body will contain a 'menuItems' property with an array of objects, each representing individual menu item. See the example.

Menu Item:

| Property    | Description                        | Type    | Read-only |
| ----------- | ---------------------------------- | ------- | --------- |
| id          | Item's unique identifier           | integer | yes       |
| name        | Complete name                      | string  | no        |
| description | Full description                   | string  | no        |
| inventory   | Number of units currently in stock | integer | no        |
| price       | Price of one unit in dollars       | integer | no        |
| menu_id     | Unique identifier of related menu  | integer | yes       |

Example:

```json
"body": {
  . . .

  "menuItems": [
    {
      "id": 1,
      "name": "Item 1",
      "description": "An item on the menu",
      "inventory": 5,
      "price": 2.5,
      "menu_id": 1
    },
    {
      "id": 2,
      "name": "Item 2",
      "description": "Another item on the menu",
      "inventory": 10,
      "price": 2,
      "menu_id": 1
    }
  ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

### 2. _Add a new menu item_

Adds a new item to the system using the data in the request body. Created item is linked to a menu using the supplied menuId.

#### **Request:**

<span style="color: yellow">POST</span> `http://localhost:4000/api/menus/:menuId/menu-items`

> NOTE: menuId is required for this request.

#### Body (**raw**)

The request body should contain a 'menuItem' property with data for the proposed update. See the example. The request will fail with a 400 response code if the menuItem object or any of its required properties are missing.

Menu Item:

| Property    | Description                        | Type    | Required |
| ----------- | ---------------------------------- | ------- | -------- |
| name        | Complete name                      | string  | yes      |
| description | Full description                   | string  | yes      |
| inventory   | Number of units currently in stock | integer | yes      |
| price       | Price of one unit in dollars       | integer | yes      |

Example:

```json
"body": {
  . . .

  "menuItem": {
    "name": "New item",
    "description": "Tasty new menu item",
    "inventory": 10,
    "price": 2.5
  }
}
```

#### **Responses:**

##### 201:

Request successful. The item was added and the response body will contain the added data in the 'menuItem' property. See the example.

Example:

```json
"body": {
  . . .

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

##### 400:

##### 404:

##### 500:

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

### _Update a menu item_

Updates a menu item's information in the system using the supplied menuItemId and menuId.

#### **Request:**

<span style="color: blue">PUT</span> `http://localhost:4000/api/menus/:menuId/menu-items/:menuItemId`

#### Body (**raw**)

The request body should contain a 'menuItem' property with data for the proposed update. See the example. The request will fail with a 400 response code if the menuItem object or any of its required properties are missing.

Menu Item:

| Property    | Description                        | Type    | Required |
| ----------- | ---------------------------------- | ------- | -------- |
| name        | Complete name                      | string  | yes      |
| description | Full description                   | string  | yes      |
| inventory   | Number of units currently in stock | integer | yes      |
| price       | Price of one unit in dollars       | integer | yes      |

Example:

```json
"body": {
  . . .

  "menuItem": {
    "name": "Updated item",
    "description": "Updated description",
    "inventory": 10,
    "price": 2.5
  }
}
```

#### **Responses:**

##### 200:

Request successful. The item was successfully updated in the system and the response body will contain the updated data in the 'menuItem' property. See the example.

Example:

```json
"body": {
  . . .

  "menuItem": {
    "id": 3,
    "name": "Updated item",
    "description": "Updated description",
    "inventory": 10,
    "price": 2.5,
    "menuId": 1
  }
}
```

##### 400:

##### 404:

##### 500:

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

<h3 id="remove_menu" style="font-style: italic">Remove a menu item</h3>

Permanently removes an item related to a menu using the supplied menuItemId and menuId.

#### **Request:**

<span style="color: red">DELETE</span> `http://localhost:4000/api/menus/:menuId/menu-items/:menuItemId`

#### **Responses:**

##### 204: Request successful. Item was removed.

##### 404:

##### 500:

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

---

## **Common Responses**

_<span id="res_400">400</span>:_  
Request was not understood by server. Invalid or incomplete request may be missing required field(s).  
_<span id="res_500">500</span>:_  
Request was unsuccessful. An unexpected error occured.

Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
