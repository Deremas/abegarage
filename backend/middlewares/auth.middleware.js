// Import the dotenv package to load environment variables
require("dotenv").config();
// Import the JWT package to handle JSON Web Tokens
const jwt = require("jsonwebtoken");
const employeeService = require("../services/employee.service");
// Retrieve the JWT secret key from environment variables
const jwtSecretKey = process.env.JWT_SECRET;

// A function to verify the JWT token received in the request headers
const verifyToken = (req, res, next) => {
  // Retrieve the token from the request headers
  const token = req.headers["x-access-token"];
  if (!token) {
    // If no token is provided, send a 403 Forbidden response
    return res
      .status(403)
      .json({ status: "fail", message: "No token provided!" });
  }

  // Verify the token using the secret key from environment variables
  jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) {
      // If token verification fails, send a 401 Unauthorized response
      return res.status(401).json({ status: "fail", message: "Unauthorized!" });
    }
    console.log(decoded);

    req.employee_email = decoded.employee_email;
    next();
  });
};

// const verifyToken = (req, res, next) => {
//   // Check for token in Authorization header ("Bearer <token>")
//   let token = null;
//   console.log("Auth Header:", req.headers["authorization"]);
//   console.log("X-Access-Token:", req.headers["x-access-token"]);

//   const authHeader = req.headers["authorization"];
//   if (authHeader && authHeader.startsWith("Bearer ")) {
//     token = authHeader.split(" ")[1]; // Extract token after 'Bearer '
//   } else {
//     // Fallback to x-access-token header
//     token = req.headers["x-access-token"];
//   }

//   if (!token) {
//     return res
//       .status(403)
//       .json({ status: "fail", message: "No token provided!" });
//   }

//   jwt.verify(token, jwtSecretKey, (err, decoded) => {
//     if (err) {
//           console.error("JWT verify error:", err);

//       return res.status(401).json({ status: "fail", message: "Unauthorized!" });
//     }
//     console.log("Decoded JWT:", decoded);

//     req.employee_email = decoded.employee_email;
//     next();
//   });
// };

// A function to check if the user is an admin

const isAdmin = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  console.log(req.employee_email);
  console.log(req);
  const employee_email = req.employee_email;
  const employee = await employeeService.getEmployeeByEmail(employee_email);
  console.log(employee);
  if (employee[0].employee_role === "Admin") {
    // If the user is an admin, proceed to the next middleware
    next();
  } else {
    return res.status(403).json({
      status: "fail",
      error: "Not an admin user!",
      //   message: "Not an admin user!",
    });
  }
};

const authMiddleware = {
  verifyToken,
  isAdmin,
};
// Export the authMiddleware object containing the verifyToken function
module.exports = authMiddleware;
