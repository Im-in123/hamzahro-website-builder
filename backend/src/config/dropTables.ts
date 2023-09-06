import { ResultSetHeader } from 'mysql2/promise';
import pool from './db';

export async function clearUsersTable(): Promise<ResultSetHeader> {
    const query = `DELETE FROM users`;
    const [result] = await pool.execute(query);
    return result as ResultSetHeader;
  }
  
  export async function clearProfilesTable(): Promise<ResultSetHeader> {
    const query = `DELETE FROM profiles`;
    const [result] = await pool.execute(query);
    return result as ResultSetHeader;
  }
  
  export async function clearAccessTokenTable(): Promise<ResultSetHeader> {
    const query = `DELETE FROM access_tokens`;
    const [result] = await pool.execute(query);
    return result as ResultSetHeader;
  }
  
  export async function dropUsersTable(): Promise<ResultSetHeader> {
    const query = `DROP TABLE IF EXISTS users`;
    const [result] = await pool.execute(query);
    return result as ResultSetHeader;
  }
  
  export async function dropProfilesTable(): Promise<ResultSetHeader> {
    const query = `DROP TABLE IF EXISTS profiles`;
    const [result] = await pool.execute(query);
    return result as ResultSetHeader;
  }
  
  export async function dropAccessTokenTable(): Promise<ResultSetHeader> {
    const query = `DROP TABLE IF EXISTS access_tokens`;
    const [result] = await pool.execute(query);
    return result as ResultSetHeader;
  }