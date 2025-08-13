const employeeService = require("../services/employee.service");

const createEmployee = async (req, res, next) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  try {
    // Check if the email already exists
    const employeeExists = await employeeService.checkIfEmployeeExists(
      req.body.employee_email
    );

    if (employeeExists) {
      return res.status(400).json({
        error: "This email address is already associated with another employee",
      });
    }

    // Create the employee
    const employee = await employeeService.createEmployee(req.body);

    if (!employee) {
      return res.status(400).json({
        error: "Failed to add the employee!",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Employee created successfully",
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

const getAllEmployees = async (req, res, next) => {
  // Call the getAllEmployees function from the employeeService
  const employees = await employeeService.getAllEmployees();

  if (!employees) {
    res.status(400).json({
      error: "Failed to get all employees!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: employees,
    });
  }
};

module.exports = { createEmployee, getAllEmployees };
