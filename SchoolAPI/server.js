const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const { dbConfig } = require('./config');

const app = express();
app.use(bodyParser.json());

// Create MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Function to test database connection
const testConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Database connection failed:", {
          message: err.message,
          code: err.code,
          errno: err.errno,
          sqlState: err.sqlState,
          sqlMessage: err.sqlMessage
        });
        reject(err);
        return;
      }
      connection.release();
      resolve();
    });
  });
};

// Function to initialize database
const initializeDatabase = async () => {
  const maxRetries = 5;
  const retryDelay = 5000; // 5 seconds

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempting to connect to database (attempt ${attempt}/${maxRetries})...`);
      await testConnection();
      console.log("Connected to MySQL database successfully.");

      // Create Schools Table if not exists
      pool.query(
        `CREATE TABLE IF NOT EXISTS schools (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          address VARCHAR(255) NOT NULL,
          latitude DECIMAL(9,6) NOT NULL,
          longitude DECIMAL(9,6) NOT NULL
        )`,
        (err) => {
          if (err) {
            console.error("Error creating table:", err);
          } else {
            console.log("Schools table created or already exists.");
          }
        }
      );
      return;
    } catch (error) {
      console.error(`Connection attempt ${attempt} failed:`, error.message);
      if (attempt < maxRetries) {
        console.log(`Retrying in ${retryDelay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      } else {
        console.error("Max retries reached. Could not connect to database.");
        process.exit(1);
      }
    }
  }
};

// Initialize database connection
initializeDatabase();

// ** Add School API **
app.post("/addSchool", (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || latitude == null || longitude == null) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  pool.query(sql, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      console.error("Error inserting school:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "School added successfully", id: result.insertId });
  });
});

// ** List Schools API (Sorted by Distance) **
app.get("/listSchools", (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and Longitude are required" });
  }

  const sql = "SELECT * FROM schools";
  pool.query(sql, (err, schools) => {
    if (err) {
      console.error("Error fetching schools:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Haversine formula to calculate distance
    const haversineDistance = (lat1, lon1, lat2, lon2) => {
      const toRad = (value) => (value * Math.PI) / 180;
      const R = 6371; // Earth radius in km

      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c; // Distance in km
    };

    // Sort schools by distance
    const sortedSchools = schools
      .map((school) => ({
        ...school,
        distance: haversineDistance(latitude, longitude, school.latitude, school.longitude),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json({ schools: sortedSchools });
  });
});

// Start server
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
