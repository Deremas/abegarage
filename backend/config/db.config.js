const mysql = require("mysql2/promise");
// Prepare connection parameters we use to connect to the database
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
};
// Create a pool of connections to the database
const pool = mysql.createPool(dbConfig);
// Prepare a function to execute queries as promises
const query = async (sql, params) => {
  const [rows, fields] = await pool.query(sql, params);
  return rows;
};

// Export the query function for use in the application
module.exports = {
  query,
  // pool,
};
