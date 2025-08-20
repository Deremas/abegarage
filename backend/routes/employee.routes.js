const express = require("express");
// Call the router method from express
const router = express.Router();
// Import the employee controller
const employeeController = require("../controllers/employee.controller");
const authMiddleware = require("../middlewares/auth.middleware");
// Create a route to handle employee registration
router.post(
  "/api/employee",
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  employeeController.createEmployee
);
// Middleware for the employees page
router.get(
  "/api/employees",
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  employeeController.getAllEmployees
);

router.put(
  "/api/employee/:id",
  // [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.editEmployee
);

// Geting  single employee
router.get(
  "/api/employee/:id",
  // [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.getEmployeeById
);

router.delete(
  "/api/employee/:id",
  // [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.deleteEmployee
)

// Export the router to be used in other modules
module.exports = router;
