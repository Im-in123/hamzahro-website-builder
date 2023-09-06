//env.ts
import dotenv from 'dotenv';
dotenv.config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbPort = Number(process.env.DB_PORT) || 3306; // You can provide a default value

// Use these variables to create your MySQL connection
export const connectionConfig = {
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  port: dbPort,
};

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET