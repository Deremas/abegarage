const express = require("express");
// Call the router method from express 
const router = express.Router();
// Import the employee controller
const employeeController = require("../controllers/employee.controller");
// Create a route to handle employee registration
router.post("/api/employee", employeeController.createEmployee);

// Export the router to be used in other modules
module.exports = router;