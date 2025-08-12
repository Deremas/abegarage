// Import the query function from the database module
const connection = require("../config/db.config");
// Import the fs module to read our SQL file
const fs = require("fs").promises;
// Write a function to create the database tables
async function install() {
  // Create a variable to hold the path to our SQL file
  const queryFile = __dirname + "/sql/initial-queries.sql";
  // const queryFile = "./sql/initial-queries.sql";
  console.log("DB: ", process.env.DB_NAME);
  console.log(queryFile);
  //  Temporary variable, used to store all queries, then return message and current query
  let queries = [];
  let finalMessage = {};
  let templine = "";
  //   Read the sql file content and split into lines
  const fileContent = await fs.readFile(queryFile, "utf-8");
  const lines = fileContent.split("\n");
  //   Create a promise to handle the asynchronous reading of the file and storing of the queries in the variables
  const executed = await new Promise((resolve, reject) => {
    // Iterate overall lines
    lines.forEach((line) => {
      if (line.trim().startsWith("--") || line.trim() === "") {
        // Skip if it's a comment or empty line
        return;
      }
      templine += line + "\n";
      if (line.trim().endsWith(";")) {
        // If it has a semicolon at the end, it's the end of the query
        // Prepare the individual query
        const sqlQuery = templine.trim();
        queries.push(sqlQuery);
        templine = ""; // Reset for next query
      }
    });
    resolve("Queries are added to the list");
  });
  //   Loop through the queries and execute them one by one asynchronously
  for (let i = 0; i < queries.length; i++) {
    try {
      const result = await connection.query(queries[i]);
      console.log("Table Created");
    } catch (error) {
      console.log("Error occured - Table not created");
      console.log("Query: ", queries[i]);
      console.log("Error: ", error.message);
      finalMessage.message = "Not all tables are created";
    }
  }

  // Prepare the final message to return tot the controller
  if (!finalMessage.message) {
    finalMessage.message = "All tables are created";
    finalMessage.status = 200;
  } else {
    finalMessage.status = 500;
  }
  //   Return the final mesage
  return finalMessage;
}

// Export the install function for use in the controller
module.exports = { install };
