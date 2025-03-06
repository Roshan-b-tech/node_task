const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "34.172.223.63", // Use environment variable if available
  user: process.env.DB_USER || "your-db-user",
  password: process.env.DB_PASS || "your-db-password",
  database: process.env.DB_NAME || "your-database-name",
  port: process.env.DB_PORT || 3306, // Default MySQL port
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise(); // Use promise-based queries
