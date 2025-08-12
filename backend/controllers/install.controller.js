// Import the install service to handle the installation logic
const installService = require("../services/install.service");
// Create a function to handle the installation request
async function install(req, res, next) {
  // Call the install service to create the database tables
  const installMessage = await installService.install();
  // Check if the installation was successful or not and send the appropriate response to the client
  if (installMessage.status === 200) {
    // If the installation was successful, send a success message with status 200
    res.status(200).json({
      message: installMessage,
    });
  } else {
    res.status(500).json({
      message: installMessage,
    });
  }
}
// Export the install function for use in other modules
module.exports = { install };
