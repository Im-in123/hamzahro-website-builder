// accessTokenRepository.ts
import pool from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

export const AccessTokenRepository = {
  async createAccessToken(userId: number, token: string, expiresAt: Date, createdAt: Date): Promise<ResultSetHeader> {
    const query = `
      INSERT INTO access_tokens (user_id, token, expires_at, created_at)
      VALUES (?, ?, ?, ?)
    `;
    const values = [userId, token, expiresAt, createdAt];
    const [result] = await pool.execute<ResultSetHeader>(query, values);
    console.log("Inserted user:::", result)
    return result;
  },


  async findAccessTokenByToken(token: string): Promise<ResultSetHeader[] | null> {
    const query = 'SELECT * FROM access_tokens WHERE token = ?';
    const [rows] = await pool.execute<ResultSetHeader[]>(query, [token]);
    return rows.length ? rows : null; // Return null when no token is found
  },
  

  async deleteAccessTokenByUserId(userId: number): Promise<void>  {
    const query = 'DELETE FROM access_tokens WHERE user_id = ?';
    await pool.execute(query, [userId]);
  },

  async deleteAllAccessTokensByUserId(userId: number): Promise<ResultSetHeader> {
    const query = 'DELETE FROM access_tokens WHERE user_id = ?';
    const [result] = await pool.execute<ResultSetHeader>(query, [userId]);
    return result;
  },
};
