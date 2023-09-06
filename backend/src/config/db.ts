// src/config/db.ts
import mysql from 'mysql2/promise';
import {connectionConfig } from './env'; // Import the environment variables

const dbHost = connectionConfig.host;
const dbUser = connectionConfig.user;
const dbPassword = connectionConfig.password;
const dbName = connectionConfig.database;
const dbPort = Number(connectionConfig.port);
 
// Create a pool of database connections
const pool = mysql.createPool({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  port: dbPort,
  waitForConnections: true,
  connectionLimit: 10, // Adjust as needed
  queueLimit: 0,
});

// Export the pool for database queries
export default pool;

// Export a connect function to establish the database connection
export const connect = async () => {
  await pool.getConnection();
};