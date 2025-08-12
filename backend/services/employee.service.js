// Import the query function from the db.config.js file
const connection = require("../config/db.config");
// Import bcrypt module
const bcrypt = require("bcrypt");
// A function to check if employee exists in the database
const checkIfEmployeeExists = async (email) => {
  // Create the SQL query to check if the employee exists
  const query = "SELECT * FROM employee WHERE employee_email = ?";
  // Execute the query and return the result
  const rows = await connection.query(query, [email]);
  if (rows.length > 0) {
    return true; // Employee exists
  } else {
    return false; // Employee does not exist
  }
};

// A function to create a new employee in the database
const createEmployee = async (employee) => {
  let createdEmployee = {};
  try {
    // Generate a salt and hash the employee's password
    const salt = await bcrypt.genSalt(10);
    // Hash the employee's password
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);
    // Insert the employee email in to the table
    const query =
      "INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)";
    const rows = await connection.query(query, [
      employee.employee_email,
      employee.active_employee,
    ]);
    console.log(rows);
    if (rows.affectedRows != 1) {
      return false;
    }
    // Get the ID of the newly created employee
    const employee_id = rows.insertId;
    // Insert the employee details in to the empoyee_info, employee_pass and employee_role tables
    const query2 =
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
    const rows2 = await connection.query(query2, [
      employee_id,
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
    ]);
    const query3 =
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)";
    const rows3 = await connection.query(query3, [employee_id, hashedPassword]);
    const query4 =
      "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
    const rows4 = await connection.query(query4, [
      employee_id,
      employee.company_role_id,
    ]);
    // Construct the created employee object
    createdEmployee = {
      employee_id: employee_id,
    };
  } catch (error) {
    console.error("Error creating employee:", error);
  }
  // Return the created employee object
  return createdEmployee;
};

// A function to get employee by email
async function getEmployeeByEmail(employee_email) {
  // const query =
  // "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";

  // const query = `SELECT
  //   e.employee_id AS employee_id,
  //   e.employee_email AS employee_email,
  //   ei.employee_first_name AS employee_first_name,
  //   ei.employee_last_name AS employee_last_name,
  //   ei.employee_phone AS employee_phone,
  //   ep.employee_password_hashed AS employee_password_hashed,
  //   cr.company_role_name AS employee_role,
  //   er.company_role_id AS employee_role_id
  // FROM employee e
  // INNER JOIN employee_info ei ON e.employee_id = ei.employee_id
  // INNER JOIN employee_pass ep ON e.employee_id = ep.employee_id
  // INNER JOIN employee_role er ON e.employee_id = er.employee_id
  // INNER JOIN company_roles cr ON er.company_role_id = cr.company_role_id
  // WHERE e.employee_email = ?`;

  const query = `
  SELECT
    e.employee_id AS employee_id,
    e.employee_email AS employee_email,
    ei.employee_first_name AS employee_first_name,
    ei.employee_last_name AS employee_last_name,
    ei.employee_phone AS employee_phone,
    ep.employee_password_hashed AS employee_password_hashed,
    cr.company_role_name AS employee_role,
    er.company_role_id AS employee_role_id
  FROM employee e
  INNER JOIN employee_info ei ON e.employee_id = ei.employee_id
  INNER JOIN employee_pass ep ON e.employee_id = ep.employee_id
  INNER JOIN employee_role er ON e.employee_id = er.employee_id
  INNER JOIN company_roles cr ON er.company_role_id = cr.company_role_id
  WHERE e.employee_email = ?`;

  const rows = await connection.query(query, [employee_email]);
  return rows;
}

// Export the functions
module.exports = { checkIfEmployeeExists, createEmployee, getEmployeeByEmail };
