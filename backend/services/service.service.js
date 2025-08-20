//Import the query function from the db.config file
const connection = require("../config/db.config");
//A function to create a new service in teh database
const createService = async(serviceInfo) => {
    try {
        const { service_name, service_description, service_price, active_service } =
            serviceInfo;
        // console.log(service_price)
        const query =
            "INSERT INTO common_services (service_name, service_description, service_price, active_service) VALUES (?, ?,?,?)";
        const result = await connection.query(query, [
            service_name,
            service_description,
            service_price,
            active_service || 0,
        ]);
        // console.log(result);
        // Check if the insertion was successful
        if (result.affectedRows !== 1) {
            return {
                success: false,
                message: "Failed to insert service into the database.",
            };
        }
        // Return success response
        return {
            success: true,
            message: "Service created successfully",
        };
    } catch (error) {
        console.error("Error in createService service:", error.message);
        return {
            success: false,
            message: "An error occurred while creating the service.",
            error: error.message,
        };
    }
}

//A function to get all the services from the database
const getAllServices = async() => {
    const query = "SELECT * FROM common_services";
    const rows = await connection.query(query);
    return rows;
}

//A function to get a service by id from the database
const getServiceById = async(serviceId) => {
    try {
        if (serviceId === undefined || serviceId === null) {
            console.error("Invalid serviceId:", serviceId);
            return null;
        }

        const query = "SELECT * FROM common_services WHERE service_id = ?";
        const rows = await connection.query(query, [serviceId]);

        if (rows.length === 0) {
            return null; // Service not found
        }

        return rows[0]; // Return the first matching service
    } catch (error) {
        console.error("Error in getServiceById:", error.message);
        return null;
    }
}

// A function to update an existing service in the database
const updateService = async(serviceInfo) => {
    // console.log(serviceInfo)
    try {
        const {
            service_id,
            service_name,
            service_description,
            service_price,
            active_service,
        } = serviceInfo;
        console.log(service_id);
        const query =
            "UPDATE common_services SET service_name = ?, service_description = ?, service_price = ?, active_service = ? WHERE service_id = ?";

        // Execute the query to update the service details
        const result = await connection.query(query, [
            service_name,
            service_description,
            service_price,
            active_service,
            service_id,
        ]);

        // Check if the update was successful (affectedRows === 1 means one row was updated)
        if (result.affectedRows === 0) {
            return {
                success: false,
                message: "Service not found or no changes were made.",
            };
        }

        // Return success response
        return {
            success: true,
            message: "Service updated successfully",
        };
    } catch (error) {
        console.error("Error in updateService:", error.message);
        return {
            success: false,
            message: "An error occurred while updating the service.",
            error: error.message,
        };
    }
}

//Export the function
module.exports = { createService, getAllServices, getServiceById, updateService };
