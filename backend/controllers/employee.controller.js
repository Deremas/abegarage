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

//Write a function to get a single employee by id
async function getEmployeeById(req, res, next) {
  try {
    const employeeId = req.params.id;
    //call the service
    const result = await employeeService.getEmployeeById(employeeId);

    if (!result.success) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    //Log and handle error
    console.error("Error fetching employee", error.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching employee",
    });
  }
}

//Write a function to edit the employee
async function editEmployee(req, res, next) {
  try {
    const employeeId = req.params.id;
    console.log(employeeId)
    const employeeData = req.body;
    console.log(employeeData)
    //call the service
    const result = await employeeService.editEmployee(employeeId, employeeData);

    if (!result.success) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    //Log and handle error
    console.error("Error updating employee", error.message);
    return res.status(500).json({
      success: false,
      message: "Error updating employee",
    });
  }
}

//Write a function to delete an employee
async function deleteEmployee(req, res, next) {
  try {
    const employeeId = req.params.id;
    //call the service
    const result = await employeeService.deleteEmployee(employeeId);

    if (!result.success) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    //Log and handle error
    console.error("Error deleting employee", error.message);
    return res.status(500).json({
      success: false,
      message: "Error deleting employee",
    });
  }
}

module.exports = { 
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  editEmployee,
  deleteEmployee 
};
