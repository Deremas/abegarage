//Import the express module
const express = require("express");
//call the router method from express to create the router
const router = express.Router();
//Import the middleware
const authMiddleware = require("../middlewares/auth.middleware");
//Import the vehicle controller
const vehicleController = require("../controllers/vehicle.controller");

//create the route to handle the add vehicle post
router.post(
    "/add-vehicle",
    // [authMiddleware.verifyToken, authMiddleware.isAdmin],
    vehicleController.createVehicle
  );
  //create the route to handle the get a vehicle
  router.get(
    "/get-vehicle",
    // [authMiddleware.verifyToken, authMiddleware.isAdmin],
    vehicleController.getAllVehicles
  );
  //create the route to handle the get a vehicle by id
  router.get(
    "/get-vehicle/:id",
    // [authMiddleware.verifyToken, authMiddleware.isAdmin],
    vehicleController.getVehicle
  );
  //create the route to handle the edit vehicle by id
  router.put(
    "/edit-vehicle/:id",
    // [authMiddleware.verifyToken, authMiddleware.isAdmin],
    vehicleController.updateVehicle
  );
  
  //Export the router
  module.exports = router;