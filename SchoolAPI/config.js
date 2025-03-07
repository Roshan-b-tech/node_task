const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = {
  DB_HOST: process.env.DB_HOST || '34.172.223.63',
  DB_USER: process.env.DB_USER || 'roshan9999',
  DB_PASS: process.env.DB_PASS || 'Roshan@7842',
  DB_NAME: process.env.DB_NAME || 'schools',
  DB_PORT: process.env.DB_PORT || '3306'
};

// Log actual values being used
console.log('Environment Variables:', {
  DB_HOST: process.env.DB_HOST || 'not set',
  DB_USER: process.env.DB_USER || 'not set',
  DB_NAME: process.env.DB_NAME || 'not set',
  DB_PORT: process.env.DB_PORT || 'not set',
  NODE_ENV: process.env.NODE_ENV || 'not set'
});

// Database configuration
const dbConfig = {
  host: requiredEnvVars.DB_HOST,
  user: requiredEnvVars.DB_USER,
  password: requiredEnvVars.DB_PASS,
  database: requiredEnvVars.DB_NAME,
  port: parseInt(requiredEnvVars.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000, // Increased timeout to 60 seconds
  acquireTimeout: 60000, // Added acquire timeout
  timeout: 60000, // Added general timeout
  multipleStatements: true,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  ssl: {
    rejectUnauthorized: false
  }
};

// Log final configuration (without sensitive data)
console.log('Final Database Configuration:', {
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database,
  port: dbConfig.port,
  environment: process.env.NODE_ENV,
  ssl: 'enabled',
  timeouts: {
    connect: dbConfig.connectTimeout,
    acquire: dbConfig.acquireTimeout,
    general: dbConfig.timeout
  }
});

module.exports = {
  dbConfig
}; 