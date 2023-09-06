import { ResultSetHeader, RowDataPacket } from 'mysql2/promise'; // Import necessary types
import pool from '../config/db';
import { User } from '../models/userModel';
import bcrypt from 'bcrypt';
 
export const UserRepository = {
  async findByEmail(email: string)  {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await pool.execute<RowDataPacket[]>(query, [email]); // Provide type annotation
    return rows.length ? rows[0] : null;
  },

  async createUser(userData: User): Promise<User> {
      const hashedPassword = bcrypt.hashSync(userData.password, 10);
      userData.password = hashedPassword;
      const query = `
      INSERT INTO users 
        (username, email, password, createdAt, updatedAt, isActive, isAdmin, isEmailVerified) 
      VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      userData.username,
      userData.email,
      userData.password,
      userData.createdAt,
      userData.updatedAt,
      userData.isActive,
      userData.isAdmin,
      userData.isEmailVerified
    ];

    const [result] = await pool.execute<ResultSetHeader>(query, values);  
    return { ...userData, id: result.insertId };
},

async findByEmailAndPassword(email: string, password: string): Promise<User | null> {
  const query = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await pool.execute<RowDataPacket[]>(query, [email]);

  if (rows.length && bcrypt.compareSync(password, rows[0].password)) {
    return rows[0] as User;
  }

  return null;
},

async findUserById(userId: number): Promise<User | null> {
  const query = 'SELECT * FROM users WHERE id = ?';
  const [rows] = await pool.execute<RowDataPacket[]>(query, [userId]);

  if (rows.length) {
    return rows[0] as User;
  }

  return null;
},

 async updateUserUsername(userId: number, newUsername: string): Promise<User | null> {
    const query = 'UPDATE users SET username = ? WHERE id = ?';
    const [result] = await pool.execute<RowDataPacket[]>(query, [newUsername, userId]);
    console.log("row1::,", result[0])
    return result[0] as User;
  },
  // Add other repository methods as needed
  
};
