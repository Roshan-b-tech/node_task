const dotenv = require('dotenv');

// Load environment variables
const result = dotenv.config();
if (result.error) {
  console.error('Error loading .env file:', result.error);
}

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || '34.172.223.63',
  user: process.env.DB_USER || 'roshan9999',
  password: process.env.DB_PASS || 'Roshan@7842',
  database: process.env.DB_NAME || 'schools',
  port: parseInt(process.env.port) || 3306,
  connectTimeout: 10000,
  multipleStatements: true,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : undefined
};

// Log configuration (without sensitive data)
console.log('Database Configuration:', {
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database,
  port: dbConfig.port,
  environment: process.env.NODE_ENV
});

module.exports = {
  dbConfig
}; 