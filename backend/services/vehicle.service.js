//Import the query function from the db.config file
const connection = require("../config/db.config");

//A function to create a new vehicle in the database
const createVehicle = async(vehicleInfo) =>{
  let createdVehicle = {};
  try {
    const query =
      "INSERT INTO customer_vehicle_info(customer_id, vehicle_year, vehicle_make,vehicle_model,vehicle_type,vehicle_mileage,vehicle_tag,vehicle_serial,vehicle_color) VALUES(?,?,?,?,?,?,?,?,?) ";
    const rows = await connection.query(query, [
      vehicleInfo.customer_id,
      vehicleInfo.vehicle_year,
      vehicleInfo.vehicle_make,
      vehicleInfo.vehicle_model,
      vehicleInfo.vehicle_type,
      vehicleInfo.vehicle_mileage,
      vehicleInfo.vehicle_tag,
      vehicleInfo.vehicle_serial,
      vehicleInfo.vehicle_color,
    ]);
    //Check if the insertion was successful
    if (rows.affectedRows !== 1) {
      return {
        success: false,
        message: "Failed to insert customer vehicle",
      };
    }
    //Construct the vehicle object to return
    createdVehicle = {
      customer_id: vehicleInfo.customer_id,
      vehicle_year: vehicleInfo.vehicle_year,
      vehicle_make: vehicleInfo.vehicle_make,
      vehicle_model: vehicleInfo.vehicle_model,
      vehicle_type: vehicleInfo.vehicle_type,
      vehicle_mileage: vehicleInfo.vehicle_mileage,
      vehicle_tag: vehicleInfo.vehicle_tag,
      vehicle_serial_number: vehicleInfo.vehicle_serial,
      vehicle_color: vehicleInfo.vehicle_color,
    };
    return {
      success: true,
      createdVehicle,
      message: "Vehicle created successfully",
    };
  } catch (error) {
    return { success: false, message: "Database query failed." };
  }
}

const getVehicle = async(customer_id) => {
    try {
      if (customer_id === undefined || customer_id === null) {
        console.error("Invalid customer_id:", customer_id);
        return {
          success: false,
          message: "Customer ID is required",
          data: []
        };
      }
  
      const query = "SELECT * FROM customer_vehicle_info WHERE customer_id = ?";
      const rows = await connection.query(query, [customer_id]);
  
      if (rows.length === 0) {
        return {
          success: false, 
          message: "No vehicles found for this customer",
          data: []
        };
      }
  
      return {
        success: true,
        data: rows
      };
    } catch (error) {
      console.error("Database error:", error.message);
      return {
        success: false,
        message: "Database error",
        data: []
      };
    }
  }

  // GET ALL VEHICLES
const getAllVehicles = async() => {
    try {
      const query = "SELECT * FROM customer_vehicle_info";
      const rows = await connection.query(query);
  
      if (rows.length === 0) {
        return {
          success: false,
          message: "No vehicles found",
          data: []
        };
      }
  
      return {
        success: true,
        data: rows
      };
    } catch (error) {
      console.error("Database error:", error.message);
      return {
        success: false,
        message: "Database error",
        data: []
      };
    }
  }

  // create afunction to update vehicle by id
const updateVehicle = async(vehicleId, vehicleData) => {
    try {
      const query =
        "UPDATE customer_vehicle_info SET vehicle_year = ?, vehicle_make = ?, vehicle_model = ?, vehicle_type = ?, vehicle_mileage = ?, vehicle_tag = ?, vehicle_serial = ?, vehicle_color = ? WHERE customer_id = ?";
      const rows = await connection.query(query, [
        vehicleData.vehicle_year,
        vehicleData.vehicle_make,
        vehicleData.vehicle_model,
        vehicleData.vehicle_type,
        vehicleData.vehicle_mileage,
        vehicleData.vehicle_tag,
        vehicleData.vehicle_serial,
        vehicleData.vehicle_color,
        vehicleId,
      ]);
      if (rows.affectedRows !== 1) {
        return {
          success: false,
          message: "Failed to update customer vehicle",
        };
      }
      return { success: true, message: "Vehicle updated successfully" };
    } catch (error) {
      console.error("Database error:", error.message);
      return { success: false, message: "Database query failed." };
    }
  }
  module.exports = {
    createVehicle,
    getVehicle,
    getAllVehicles,
    updateVehicle,
  };
  