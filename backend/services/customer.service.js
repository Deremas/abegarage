// Import the query function from the db.config file
const connection = require("../config/db.config");

// Import bcrypt for password hashing
const bcrypt = require("bcrypt");

// A function to check if a customer exists in the database by their email
async function checkIfCustomerExists(email) {
  const query = "SELECT * FROM customer_identifier WHERE customer_email = ?";

  // Execute the query to check if the customer exists
  const rows = await connection.query(query, [email]);
  return rows.length > 0;
}

async function createCustomer(customerData) {
    let createdCustomer = {};
    console.log(customerData); // ✅ Fixed log
  
    try {
      // Validate required fields
      if (
        !customerData.customer_email ||
        !customerData.customer_phone_number ||
        !customerData.customer_password ||
        !customerData.customer_first_name ||
        !customerData.customer_last_name ||
        customerData.active_customer_status === undefined
      ) {
        return {
          success: false,
          message: "Missing required customer fields.",
        };
      }
  
      // Hash the customer's password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(customerData.customer_password, salt);
  
      // Insert into customer_identifier
      const query1 = `
        INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash)
        VALUES (?, ?, ?)
      `;
      const result1 = await connection.query(query1, [
        customerData.customer_email,
        customerData.customer_phone_number,
        hashedPassword,
      ]);
  
      if (result1.affectedRows !== 1) {
        return {
          success: false,
          message: "Failed to insert customer identifier.",
        };
      }
  
      const customer_id = result1.insertId;
  
      // Insert into customer_info
      const query2 = `
        INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status)
        VALUES (?, ?, ?, ?)
      `;
      const result2 = await connection.query(query2, [
        customer_id,
        customerData.customer_first_name,
        customerData.customer_last_name,
        customerData.active_customer_status,
      ]);
  
      if (result2.affectedRows !== 1) {
        return {
          success: false,
          message: "Failed to insert customer information.",
        };
      }
  
      // Return success response
      createdCustomer = {
        customer_id,
        customer_email: customerData.customer_email,
        customer_first_name: customerData.customer_first_name,
        customer_last_name: customerData.customer_last_name,
      };
  
      return {
        success: true,
        createdCustomer,
        message: "Customer created successfully.",
      };
  
    } catch (error) {
      console.error("Error creating customer:", error.message);
      return {
        success: false,
        message: "Database query failed.",
      };
    }
  }

//  Get All customers
async function getAllCustomers() {
    const query =
      "SELECT customer_info.*,customer_identifier.customer_email,customer_identifier.customer_added_date,customer_identifier.customer_added_date,customer_identifier.customer_phone_number FROM customer_info INNER JOIN customer_identifier ON customer_info.customer_id = customer_identifier.customer_id ORDER BY customer_identifier.customer_id DESC ";
    const rows = await connection.query(query);
    return rows;
  }

  //Create a  function to handle the customerEdit
async function editCustomer(customer_id, customerData) {
    try {
      // Use correct property names
      const {
        customer_first_name,
        customer_last_name,
        customer_phone_number, 
        active_customer_status,
      } = customerData;
  
      // Check for required values and fallback to null if undefined
      if (
        !customer_phone_number ||
        !customer_first_name ||
        !customer_last_name ||
        active_customer_status === undefined
      ) {
        return { success: false, message: "Missing required customer fields." };
      }
  
      const query = `
        UPDATE customer_identifier
        INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id
        SET customer_info.customer_first_name = ?,
            customer_info.customer_last_name = ?,
            customer_info.active_customer_status = ?,
            customer_identifier.customer_phone_number = ?
        WHERE customer_identifier.customer_id = ? 
      `;
  
      const rows = await connection.query(query, [
        customer_first_name,
        customer_last_name,
        active_customer_status,
        customer_phone_number,
        customer_id,
      ]);
  
      if (rows.affectedRows === 0) {
        return {
          success: false,
          message: "No matching customer found or no changes were made.",
        };
      }
  
      return { success: true, message: "Customer updated successfully" };
    } catch (error) {
      console.error("Error editing customer:", error.message);
      throw new Error("Database query failed");
    }
  }


//Create a function to get a customer by id
async function getCustomerById(customer_id) {
    try {
      const query = `
        SELECT customer_info.*, customer_identifier.customer_email, customer_identifier.customer_phone_number
        FROM customer_info
        INNER JOIN customer_identifier ON customer_info.customer_id = customer_identifier.customer_id
        WHERE customer_identifier.customer_id = ?
      `;
      const rows = await connection.query(query, [customer_id]);
      if (rows.length === 0) {
        return null; // No customer found with the given ID
      }
      return rows[0]; // Return the first matching row
    } catch (error) {
      console.error("Database error:", error.message);
      throw new Error("Failed to retrieve customer by ID");
    }
  }

  //Create the searchCustomers function to get the customer from teh database
async function searchCustomers(searchQuery) {
    try {
      const searchTerm = `%${searchQuery}%`;
      const query = `
        SELECT 
          customer_info.*,
          customer_identifier.customer_email,
          customer_identifier.customer_phone_number
        FROM customer_info
        INNER JOIN customer_identifier 
          ON customer_info.customer_id = customer_identifier.customer_id
        WHERE 
          customer_identifier.customer_email LIKE ? OR
          customer_identifier.customer_phone_number LIKE ? OR
          customer_info.customer_first_name LIKE ? OR
          customer_info.customer_last_name LIKE ?
        ORDER BY customer_identifier.customer_id DESC
        LIMIT 10
      `;
  
      const rows = await connection.query(query, [
        searchTerm,
        searchTerm,
        searchTerm,
        searchTerm,
      ]);
  
      return rows;
    } catch (error) {
      console.error("Database search error:", error.message);
      throw new Error("Failed to execute customer search");
    }
  }

//   Export functions
module.exports = {
    checkIfCustomerExists,
    createCustomer,
    getCustomerById,
    getAllCustomers,
    editCustomer,
    searchCustomers,
  };