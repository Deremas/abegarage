// Import the employee service
const employeeService = require("../services/employee.service");
// Create the add employee controller

const createEmployee = async (req, res, next) => {
  // Check if employee emaiil already exists in the database
  const emplopeeExists = await employeeService.getEmployeeByEmail(
    req.body.employee_email
  );
  // If employee exists, send a renspose to the client
  if (emplopeeExists) {
    res.status(400).json({
      error: "This email address is already associated with another employee",
    });
  } else {
    try {
      const employeeData = req.body;
      // Create the employee
      const employee = await employeeService.createEmployee(employeeData);
      if (!employee) {
        res.status(400).json({
          error: "Failed to add the employee!",
        });
      } else {
        res.status(200).json({
          status: "true",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Something went wrong",
      });
    }
  }
};

// Export the createEmployee controller
module.exports = { createEmployee };
