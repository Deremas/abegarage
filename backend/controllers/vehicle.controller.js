//Import the vehicle service
const vehicleService = require("../services/vehicle.service");
//Create the add vehicle controller
const createVehicle = async(req, res, next) => {
  try {
    const vehicleInfo = req.body;
    
    //create the vehicle
    const createdVehicle = await vehicleService.createVehicle(vehicleInfo);
    //send the created vehicle back to the client
    // console.log(createdVehicle);
    if (!createdVehicle.success) {
      return res.status(404).json({
        success: false,
        message: "Failed to add the vehicle",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Vehicle created successfully",
      });
    }
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
}

// GET ALL VEHICLES 
const getAllVehicles = async(req, res, next) => {
    try {
      const vehicles = await vehicleService.getAllVehicles();
      if (!vehicles) {
        return res.status(404).json({
          error: "Failed to get vehicles!",
        });
      } else {
        return res.status(200).json({
          success: true,
          data: vehicles,
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: "Something went wrong",
        data: [], // Ensure array even on error 
      });
    }
  }


  const getVehicle = async (req, res, next) => {
    try {
      const customer_id = req.params.id; // Get from URL parameter
      
      // Add validation
      if (!customer_id) {
        return res.status(400).json({
          success: false,
          message: "Customer ID is required",
          data: []
        });
      }
  
      // Convert to number
      const numericCustomerId = parseInt(customer_id);
      if (isNaN(numericCustomerId)) {
        return res.status(400).json({
          success: false,
          message: "Customer ID must be a valid number",
          data: []
        });
      }
  
      const result = await vehicleService.getVehicle(numericCustomerId);
  
      // Return appropriate status based on result
      const statusCode = result.success ? 200 : 404;
      res.status(statusCode).json({
        success: result.success,
        message: result.message,
        data: result.data
      });
  
    } catch (error) {
      console.error("Error in getVehicle controller:", error.message);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        data: []
      });
    }
  }



  const updateVehicle = async(req, res, next) => {
    try {
      const vehicleId = req.params.id;
      const vehicleData = req.body;
      const updatedVehicle = await vehicleService.updateVehicle(vehicleId, vehicleData);
      if (!updatedVehicle) {
        return res.status(404).json({
          error: "Failed to update vehicle!",
        });
      } else {
        return res.status(200).json({
          success: true,
          data: updatedVehicle,
        });
      }
    } catch (error) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
  }

  module.exports = {
    createVehicle,
    getAllVehicles,
    getVehicle,
    updateVehicle,
  };