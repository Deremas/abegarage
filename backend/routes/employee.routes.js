const express = require("express");
// Call the router method from express 
const router = express.Router();
// Import the employee controller
const employeeController = require("../controllers/employee.controller");
const authMiddleware = require("../middlewares/auth.middleware");
// Create a route to handle employee registration
router.post("/api/employee", authMiddleware.verifyToken, authMiddleware.isAdmin, employeeController.createEmployee);


// Export the router to be used in other modules
module.exports = router;