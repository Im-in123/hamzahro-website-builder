//tables.ts
import { ResultSetHeader } from 'mysql2/promise';
import pool from './db';

 

export async function createUsersTable(): Promise<ResultSetHeader> {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      createdAt DATETIME,
      updatedAt DATETIME,
      isActive BOOLEAN NOT NULL,
      isAdmin BOOLEAN NOT NULL,
      isEmailVerified BOOLEAN NOT NULL
    )
  `;
  const [result] = await pool.execute(query);
  return result as ResultSetHeader;
}

export async function createProfilesTable(): Promise<ResultSetHeader> {
  const query = `
    CREATE TABLE IF NOT EXISTS profiles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      avatar VARCHAR(255)  ,
      birthDate DATE NOT NULL,
      city VARCHAR(255),
      state VARCHAR(255),
      country VARCHAR(255) NOT NULL,
      createdAt DATETIME,
      updatedAt DATETIME,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `;
  const [result] = await pool.execute(query);
  return result as ResultSetHeader;
}

 
export async function createAccessTokenTable(): Promise<ResultSetHeader> {
  const query = `
   CREATE TABLE IF NOT EXISTS access_tokens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  `;
  const [result] = await pool.execute(query);
  return result as ResultSetHeader;
}


