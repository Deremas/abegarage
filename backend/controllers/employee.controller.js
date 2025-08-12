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

module.exports = { createEmployee };

// // Import the employee service
// const employeeService = require("../services/employee.service");
// // Create the add employee controller

// const createEmployee = async (req, res, next) => {

//   console.log(req.headers);

//   // Check if employee emaiil already exists in the database
//   const emplopeeExists = await employeeService.checkIfEmployeeExists(
//     res.employee_email
//   );
//   // If employee exists, send a renspose to the client
//   if (emplopeeExists) {
//     res.status(400).json({
//       error: "This email address is already associated with another employee",
//     });
//   } else {
//     try {
//       const employeeData = req.body;
//       // Create the employee
//       const employee = await employeeService.createEmployee(employeeData);
//       if (!employee) {
//         res.status(400).json({
//           error: "Failed to add the employee!",
//         });
//       } else {
//         res.status(200).json({
//           status: "true",
//           message: "Employee created successfully",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(400).json({
//         error: "Something went wrong",
//       });
//     }
//   }
// };

// // Export the createEmployee controller
// module.exports = { createEmployee };
