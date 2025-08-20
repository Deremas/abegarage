const connection = require("../config/db.config");
const crypto = require("crypto");

// Generate order hash
// const generateOrderHash = () => {
//   return crypto
//     .createHash("sha256")
//     .update(crypto.randomBytes(32).toString("hex"))
//     .digest("hex");
// };

// Function to create a new order in the database
// async function createOrder(orderData) {
//     try {
//       const orderHash = orderData.order_hash || generateOrderHash();
//       const {
//         employee_id,
//         customer_id,
//         vehicle_id,
//         active_order,
//         order_info,
//         order_services,
//         order_status,
//       } = orderData;
  
//       const {
//         order_total_price,
//         estimated_completion_date,
//         completion_date,
//         additional_request,
//         notes_for_internal_use,
//         notes_for_customer,
//         additional_requests_completed
//       } = order_info;
  
//       // 1. Insert into orders
//       const orderResult = await connection.query(
//         `INSERT INTO orders 
//           (employee_id, customer_id, vehicle_id, order_date, order_description, 
//            estimated_completion_date, order_completed, order_total_price, active_order, order_hash)
//          VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?, ?, ?, ?)`,
//         [
//           employee_id,
//           customer_id,
//           vehicle_id,
//           additional_request || null,
//           estimated_completion_date || null,
//           false, // order_completed
//           order_total_price || 0,
//           active_order || 0,
//           orderHash
//         ]
//       );
  
//       const orderId = orderResult.insertId;
  
//       // 2. Insert into order_info
//       await connection.query(
//         `INSERT INTO order_info 
//           (order_id, order_total_price, estimated_completion_date, completion_date, 
//            additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed)
//          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//         [
//           orderId,
//           order_total_price || 0,
//           estimated_completion_date || null,
//           completion_date || null,
//           additional_request || null,
//           notes_for_internal_use || null,
//           notes_for_customer || null,
//           additional_requests_completed || 0
//         ]
//       );
  
//       // 3. Insert into order_services (removing duplicates)
//       if (order_services && order_services.length > 0) {
//         const uniqueServices = Array.from(
//           new Map(order_services.map(s => [JSON.stringify(s), s])).values()
//         );
  
//         const serviceValues = uniqueServices
//           .map((s) => [orderId, s.service_id, s.service_completed || 0])
//           .flat();
//         const placeholders = uniqueServices.map(() => "(?, ?, ?)").join(", ");
  
//         await connection.query(
//           `INSERT INTO order_services (order_id, service_id, service_completed) VALUES ${placeholders}`,
//           serviceValues
//         );
//       }
  
//       // 4. Insert into order_status
//       if (order_status && typeof order_status.order_status === 'number') {
//         await connection.query(
//           `INSERT INTO order_status (order_id, order_status) VALUES (?, ?)`,
//           [orderId, order_status.order_status]
//         );
//       }
  
//       return { success: true, orderId, orderHash };
//     } catch (error) {
//       console.error("Order creation failed:", error.message);
//       return { success: false, error: error.message };
//     }
//   }

// async function createOrder(orderData) {
//   try {
//     const orderHash = orderData.order_hash || generateOrderHash();
//     const {
//       employee_id,
//       customer_id,
//       vehicle_id,
//       order_services,
//       order_status,
//     } = orderData;

//     // Extract order info from the request (either from order_info object or root level)
//     const orderInfo = orderData.order_info || {};
//     const {
//       order_total_price = 0,
//       estimated_completion_date = null,
//       completion_date = null,
//       additional_request = null,
//       notes_for_internal_use = null,
//       notes_for_customer = null,
//       additional_requests_completed = 0
//     } = orderInfo;

//     // 1. Insert into orders (only the basic columns that exist in orders table)
//     const orderResult = await connection.query(
//       `INSERT INTO orders 
//         (employee_id, customer_id, vehicle_id, order_date, active_order, order_hash)
//        VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?, ?)`,
//       [
//         employee_id,
//         customer_id,
//         vehicle_id,
//         1, // active_order (assuming 1 means active)
//         orderHash
//       ]
//     );

//     const orderId = orderResult.insertId;

//     // 2. Insert into order_info (this is where most of the order details go)
//     await connection.query(
//       `INSERT INTO order_info 
//         (order_id, order_total_price, estimated_completion_date, completion_date, 
//          additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         orderId,
//         order_total_price,
//         estimated_completion_date,
//         completion_date,
//         additional_request,
//         notes_for_internal_use,
//         notes_for_customer,
//         additional_requests_completed
//       ]
//     );

//     // 3. Insert into order_services
//     if (order_services && order_services.length > 0) {
//       const uniqueServices = Array.from(
//         new Map(order_services.map(s => [s.service_id, s])).values()
//       );

//       const serviceValues = uniqueServices
//         .map((s) => [orderId, s.service_id, s.service_completed || 0])
//         .flat();
//       const placeholders = uniqueServices.map(() => "(?, ?, ?)").join(", ");

//       await connection.query(
//         `INSERT INTO order_services (order_id, service_id, service_completed) VALUES ${placeholders}`,
//         serviceValues
//       );
//     }

//     // 4. Insert into order_status (if provided)
//     if (order_status && typeof order_status.order_status === 'number') {
//       await connection.query(
//         `INSERT INTO order_status (order_id, order_status) VALUES (?, ?)`,
//         [orderId, order_status.order_status]
//       );
//     }

//     return { success: true, orderId, orderHash };
//   } catch (error) {
//     console.error("Order creation failed:", error.message);
//     return { success: false, error: error.message };
//   }
// }

// Helper function to format dates for MySQL
function formatDateForMySQL(dateString) {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19).replace('T', ' ');
  } catch (error) {
    console.error("Date formatting error:", error);
    return null;
  }
}

// Helper function to generate order hash
function generateOrderHash() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

async function createOrder(orderData) {
  try {
    console.log("🛠️ Starting order creation process");
    
    const orderHash = orderData.order_hash || generateOrderHash();
    const {
      employee_id,
      customer_id,
      vehicle_id,
      active_order = 1,
      order_services = [],
      order_status,
    } = orderData;

    // Extract order info
    const orderInfo = orderData.order_info || {};
    const {
      order_total_price = 0,
      estimated_completion_date = null,
      completion_date = null,
      additional_request = null,
      notes_for_internal_use = null,
      notes_for_customer = null,
      additional_requests_completed = 0
    } = orderInfo;

    // Format dates for MySQL
    const formattedEstCompletion = formatDateForMySQL(estimated_completion_date);
    const formattedCompletion = formatDateForMySQL(completion_date);

    console.log("📊 Inserting into orders table...");
    // 1. Insert into orders
    const orderResult = await connection.query(
      `INSERT INTO orders 
        (employee_id, customer_id, vehicle_id, order_date, active_order, order_hash)
       VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?, ?)`,
      [employee_id, customer_id, vehicle_id, active_order, orderHash]
    );

    const orderId = orderResult.insertId;
    console.log("✅ Orders insert successful, ID:", orderId);

    console.log("📊 Inserting into order_info table...");
    // 2. Insert into order_info
    await connection.query(
      `INSERT INTO order_info 
        (order_id, order_total_price, estimated_completion_date, completion_date, 
         additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        order_total_price,
        formattedEstCompletion,
        formattedCompletion,
        additional_request,
        notes_for_internal_use,
        notes_for_customer,
        additional_requests_completed
      ]
    );
    console.log("✅ Order_info insert successful");

    // 3. Insert into order_services
    if (order_services.length > 0) {
      console.log("📊 Inserting into order_services table...");
      const serviceValues = order_services
        .map((s) => [orderId, s.service_id, s.service_completed || 0])
        .flat();
      const placeholders = order_services.map(() => "(?, ?, ?)").join(", ");

      await connection.query(
        `INSERT INTO order_services (order_id, service_id, service_completed) VALUES ${placeholders}`,
        serviceValues
      );
      console.log("✅ Order_services insert successful");
    }

    // 4. Insert into order_status
    if (order_status && typeof order_status.order_status === 'number') {
      console.log("📊 Inserting into order_status table...");
      await connection.query(
        `INSERT INTO order_status (order_id, order_status) VALUES (?, ?)`,
        [orderId, order_status.order_status]
      );
      console.log("✅ Order_status insert successful");
    }

    console.log("🎉 Order creation process completed successfully");
    return { success: true, orderId, orderHash };
    
  } catch (error) {
    console.error("💥 Service error details:", {
      message: error.message,
      stack: error.stack
    });
    return { success: false, error: error.message };
  }
}


function generateOrderHash() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Make sure this function exists!
// function generateOrderHash() {
//   return Math.random().toString(36).substring(2) + Date.now().toString(36);
// }

//   Functions to get all orders
async function getAllOrders() {
    try {
      const query = `
       SELECT 
      o.order_id,
      o.order_hash,
      MAX(o.order_date) AS order_date,  -- Use MAX instead of ANY_VALUE
      MAX(o.active_order) AS active_order,
      MAX(v.vehicle_year) AS vehicle_year,
      MAX(v.vehicle_make) AS vehicle_make,
      MAX(v.vehicle_model) AS vehicle_model,
      MAX(v.vehicle_color) AS vehicle_color,
      MAX(v.vehicle_mileage) AS vehicle_mileage,
      MAX(v.vehicle_serial) AS vehicle_serial,
      MAX(v.vehicle_tag) AS vehicle_tag,
      MAX(ci.customer_first_name) AS customer_first_name,
      MAX(ci.customer_last_name) AS customer_last_name,
      MAX(CONCAT(ci.customer_first_name, ' ', ci.customer_last_name)) AS customer_name,
      MAX(c.customer_email) AS customer_email,
      MAX(c.customer_phone_number) AS customer_phone_number,
      MAX(CONCAT(ei.employee_first_name, ' ', ei.employee_last_name)) AS employee_name,
      MAX(oi.order_total_price) AS order_total_price,
      MAX(oi.estimated_completion_date) AS estimated_completion_date,
      MAX(oi.additional_request) AS additional_request,
      MAX(oi.additional_requests_completed) AS additional_requests_completed,
      GROUP_CONCAT(
          CONCAT(cs.service_id, ':', cs.service_name, ':', os.service_completed) 
          SEPARATOR ', '
      ) AS services
  FROM orders o
  JOIN customer_vehicle_info v ON o.vehicle_id = v.vehicle_id
  JOIN customer_identifier c ON o.customer_id = c.customer_id
  JOIN customer_info ci ON c.customer_id = ci.customer_id
  JOIN employee emp ON o.employee_id = emp.employee_id
  JOIN employee_info ei ON emp.employee_id = ei.employee_id
  LEFT JOIN order_info oi ON o.order_id = oi.order_id
  LEFT JOIN order_services os ON o.order_id = os.order_id
  LEFT JOIN common_services cs ON os.service_id = cs.service_id
  GROUP BY o.order_id
  ORDER BY order_date DESC;
  `;
  
      const orders = await connection.query(query);
      return orders.map((order) => ({
        ...order,
        services: order.services
          ? order.services.split(", ").map((service) => {
              const [service_id, service_name, service_completed] =
                service.split(":");
              return {
                service_id: parseInt(service_id),
                service_name,
                service_completed: parseInt(service_completed),
              };
            })
          : [],
      }));
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      throw error;
    }
  }

// Function to get order details by customer ID
async function getCustomerOrders(customerId) {
    try {
      const query = `
        SELECT
      MAX(o.order_id) AS order_id,
      MAX(o.order_hash) AS order_hash, 
      MAX(o.order_date) AS order_date,
      MAX(o.active_order) AS active_order,
      MAX(v.vehicle_year) AS vehicle_year,
      MAX(v.vehicle_make) AS vehicle_make,
      MAX(v.vehicle_model) AS vehicle_model,
      MAX(v.vehicle_color) AS vehicle_color,
      MAX(v.vehicle_mileage) AS vehicle_mileage,
      MAX(v.vehicle_serial) AS vehicle_serial,
      MAX(v.vehicle_tag) AS vehicle_tag,
      MAX(CONCAT(ci.customer_first_name, ' ', ci.customer_last_name)) AS customer_name,
      MAX(c.customer_email) AS customer_email,
      MAX(c.customer_phone_number) AS customer_phone_number,
      MAX(CONCAT(ei.employee_first_name, ' ', ei.employee_last_name)) AS employee_name,
      MAX(oi.order_total_price) AS order_total_price,
      MAX(oi.additional_request) AS additional_request,
      MAX(oi.estimated_completion_date) AS estimated_completion_date,
      MAX(oi.additional_requests_completed) AS additional_requests_completed,
      GROUP_CONCAT(DISTINCT CONCAT(cs.service_id, ':', cs.service_name) SEPARATOR ', ') AS services
  FROM orders o
  JOIN customer_vehicle_info v ON o.vehicle_id = v.vehicle_id
  JOIN customer_identifier c ON o.customer_id = c.customer_id
  JOIN customer_info ci ON c.customer_id = ci.customer_id
  JOIN employee emp ON o.employee_id = emp.employee_id
  JOIN employee_info ei ON emp.employee_id = ei.employee_id
  LEFT JOIN order_info oi ON o.order_id = oi.order_id
  LEFT JOIN order_services os ON o.order_id = os.order_id
  LEFT JOIN common_services cs ON os.service_id = cs.service_id
  WHERE o.customer_id = ?
  GROUP BY o.order_id
  ORDER BY o.order_date DESC;
  `;
  
      const orders = await connection.query(query, [customerId]);
      return orders.map((order) => ({
        ...order,
        services: order.services
          ? order.services.split(", ").map((service) => {
              const [id, name] = service.split(":");
              return { service_id: Number(id), service_name: name };
            })
          : [],
      }));
    } catch (error) {
      console.error("Error fetching customer orders:", error.message);
      throw error;
    }
  }

  //Function to update the order
async function updateOrder(order_id, orderData) {
    try {
      // Validate if order ID exists
      const order = await connection.query(
        `SELECT COUNT(*) AS count FROM orders WHERE order_id = ?`,
        [order_id]
      );
      if (order[0].count === 0) {
        throw new Error("Order not found");
      }
  
      // Destructure and validate required fields
      const {
        employee_id,
        customer_id,
        vehicle_id,
        order_description,
        estimated_completion_date,
        order_completed,
        order_info = {},
        order_services = [],
      } = orderData;
  
      if (
        employee_id === undefined ||
        customer_id === undefined ||
        vehicle_id === undefined
      ) {
        throw new Error(
          "Missing required fields (employee_id, customer_id, or vehicle_id)"
        );
      }
  
      // Update the main order
      const updateQuery = `
        UPDATE orders 
        SET employee_id = ?, customer_id = ?, vehicle_id = ?, order_description = ?, 
            estimated_completion_date = ?, order_completed = ? 
        WHERE order_id = ?;
      `;
      await connection.query(updateQuery, [
        employee_id,
        customer_id,
        vehicle_id,
        order_description || null,
        estimated_completion_date || null,
        order_completed || false,
        order_id,
      ]);
  
      // Update order_info
      const {
        order_total_price = null,
        additional_request = null,
        notes_for_internal_use = null,
        notes_for_customer = null,
      } = order_info;
  
      const updateInfoQuery = `
        UPDATE order_info 
        SET order_total_price = ?, additional_request = ?, notes_for_internal_use = ?, notes_for_customer = ? 
        WHERE order_id = ?;
      `;
      await connection.query(updateInfoQuery, [
        order_total_price,
        additional_request,
        notes_for_internal_use,
        notes_for_customer,
        order_id,
      ]);
  
      // Replace all services (delete old ones, insert updated ones)
      await connection.query(`DELETE FROM order_services WHERE order_id = ?`, [
        order_id,
      ]);
  
      for (let service of order_services) {
        const insertServiceQuery = `
          INSERT INTO order_services (order_id, service_id, service_completed) 
          VALUES (?, ?, ?)
        `;
        await connection.query(insertServiceQuery, [
          order_id,
          service.service_id,
          service.service_completed || 0,
        ]);
      }
  
      return { success: true, message: "Order updated successfully!" };
    } catch (error) {
      console.error("Error updating order:", error);
      return { success: false, message: error.message };
    }
  }

  // Service to track the order
async function trackOrder(orderHash) {
    try {
      const query = `
        SELECT 
          c.customer_email,
          c.customer_phone_number,
          ci.customer_first_name,
          ci.customer_last_name,
          v.vehicle_year,
          v.vehicle_make,
          v.vehicle_model,
          v.vehicle_type,
          v.vehicle_mileage,
          v.vehicle_tag,
          v.vehicle_serial,
          v.vehicle_color,
          o.order_date,
          o.active_order,
          oi.order_total_price,
          oi.estimated_completion_date,
          oi.completion_date,
          oi.additional_request,
          oi.notes_for_customer,
          oi.additional_requests_completed,
          COALESCE(
            JSON_ARRAYAGG(
              JSON_OBJECT(
                'service_name', s.service_name,
                'service_description', s.service_description,
                'service_price', s.service_price,
                'service_completed', os.service_completed
              )
            ), '[]'
          ) AS services
        FROM orders o
        JOIN customer_identifier c ON o.customer_id = c.customer_id
        JOIN customer_info ci ON c.customer_id = ci.customer_id
        JOIN customer_vehicle_info v ON o.vehicle_id = v.vehicle_id
        LEFT JOIN order_services os ON o.order_id = os.order_id
        LEFT JOIN common_services s ON os.service_id = s.service_id
        LEFT JOIN order_info oi ON o.order_id = oi.order_id
        WHERE o.order_hash = ?
        GROUP BY o.order_id, c.customer_email, c.customer_phone_number, ci.customer_first_name, 
                 ci.customer_last_name, v.vehicle_year, v.vehicle_make, v.vehicle_model, 
                 v.vehicle_type, v.vehicle_mileage, v.vehicle_tag, v.vehicle_serial, v.vehicle_color, 
                 o.order_date, o.active_order, oi.order_total_price, oi.estimated_completion_date, 
                 oi.completion_date, oi.additional_request, oi.notes_for_customer, 
                 oi.additional_requests_completed;
      `;
  
      const results = await connection.query(query, [orderHash]);
  
      if (!results.length) {
        return null;
      }
  
      const orderData = {
        ...results[0],
        services: JSON.parse(results[0].services || "[]"),
      };
  
      return orderData;
    } catch (error) {
      console.error("Error tracking order:", error);
      throw new Error("Failed to retrieve order details");
    }
  }

  module.exports = {
    createOrder,
    getAllOrders,
    getCustomerOrders,
    updateOrder,
    trackOrder,
  };
