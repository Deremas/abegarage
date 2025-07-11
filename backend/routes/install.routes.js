// Import the express module
const express = require("express");
// Call the express Router function to create a new router object
const router = express.Router();
// Import the install controller
const installController = require("../controllers/install.controller");
// Create a route for the GET request to the /install endpoint
router.get("/install", installController.install);

// Export the router object for use in other modules
module.exports = router;