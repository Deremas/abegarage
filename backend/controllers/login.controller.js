const loginService = require("../services/login.service");
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET;

// Handle employee login
async function logIn(req, res, next) {
  try {
    console.log("Login Request Body:", req.body);

    const employeeData = req.body;
    const employee = await loginService.logIn(employeeData);
    console.log(employee);

    // If employee not found or wrong credentials
    if (employee.status === "fail") {
      return res.status(403).json({
        status: employee.status,
        message: employee.message,
      });
    }

    // Create JWT payload
    const payload = {
      employee_id: employee.message.employee_id,
      employee_email: employee.message.employee_email,
      employee_role: employee.message.employee_role,
      employee_first_name: employee.message.employee_first_name,
      employee_role_id: employee.message.employee_role_id,
    };

    // Sign token
    const token = jwt.sign(payload, jwtSecretKey, { expiresIn: "24h" });

    // Send success response
    return res.status(200).json({
      status: "success",
      message: "Employee logged in successfully",
      data: { employee_token: token },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({
      status: "error",
      message: "An error occurs during login",
    });
  }
}

module.exports = { logIn };
