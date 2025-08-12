// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the install router
const installRouter = require("./install.routes");
// Import the employee router
const employeeRouter = require("./employee.routes");
// Import the login router
const loginRouter = require("./login.routes");
// Add the install router to the main router
router.use(installRouter);
// Add the employee router to the main router
router.use(employeeRouter);
// Add the login route to the main router
router.use(loginRouter);

module.exports = router;
