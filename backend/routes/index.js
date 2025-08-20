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
//Import the customer routes
const customerRouter = require('./customer.routes')
//Import the vehicle routes
const vehicleRouter = require('./vehicle.routes')
//Import the service routes
const serviceRouter = require('./service.routes')
//Import teh order routes
const orderRouter = require('./order.routes')
// Add the install router to the main router
router.use(installRouter);
// Add the employee router to the main router
router.use(employeeRouter);
// Add the login route to the main router
router.use(loginRouter);
//Add the customer routes to the main router
router.use(customerRouter);
//Add the vehicle routes to the main router
router.use("/api",vehicleRouter);
//Add the service routes to the main router
router.use("/api", serviceRouter);
//Add the order routes to the main router
router.use(orderRouter);

//Export the router 
module.exports = router;
