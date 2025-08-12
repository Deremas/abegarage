// Import the express module
const express = require("express");
// Import the dotenv module to load environment variables
const dotenv = require("dotenv");
dotenv.config();
// Import sanitizee module
const sanitize = require("sanitize")
// import cors module
const cors = require("cors");
// Setup the cors options 
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Allow requests from the frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
  optionsSuccessStatus: 200, // 
  // credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
// Create a variable to hold our port number
const PORT = process.env.PORT;
// Import the router
const router = require("./routes");
// Create the express application
const app = express();
// Add the cors middleware to allow cross-origin requests
app.use(cors(corsOptions));
// Add the express.json middleware 
app.use(express.json())
// Add the sanitizer to the express middleware
app.use(sanitize.middleware)
// Add the routes to the application as a middleware
app.use(router);
// Start the webserver
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app variable for use in other modules
module.exports = app;
