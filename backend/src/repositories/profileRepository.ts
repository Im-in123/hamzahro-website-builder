// profileRepository.ts

import pool from '../config/db';
import { Profile } from '../models/profileModel';
import { ResultSetHeader, RowDataPacket  } from 'mysql2/promise'; 

export const ProfileRepository = {
  async createProfile(profileData: Profile): Promise<Profile | null> {
    const query = `
      INSERT INTO profiles
      (userId, firstName, lastName, birthDate, city, state, country, avatar, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      profileData.userId,
      profileData.firstName,
      profileData.lastName,
      profileData.birthDate,
      profileData.city,
      profileData.state,
      profileData.country,
      profileData.avatar,
      profileData.createdAt,
      profileData.updatedAt
    ];

    try {
      const [result] = await pool.execute<ResultSetHeader>(query, values);
      const profileId = result.insertId;

      return { ...profileData, id: profileId };
    } catch (error) {
      console.error('Error creating profile:', error);
      return null;
    }
  },

  async updateProfile(profileData: Profile): Promise<Profile | null> {
    const query = `
      UPDATE profiles
      SET firstName = ?, lastName = ?, birthDate = ?, city = ?, state = ?, country = ?, avatar = ?, createdAt = ?, updatedAt = ?
      WHERE userId = ?
    `;

    const values = [
      profileData.firstName,
      profileData.lastName,
      profileData.birthDate,
      profileData.city,
      profileData.state,
      profileData.country,
      profileData.avatar,
      profileData.createdAt,
      profileData.updatedAt,
      profileData.userId,
    ];

    try {
      await pool.execute(query, values);
      return profileData;
    } catch (error) {
      console.error('Error updating profile:', error);
      return null;
    }
  },
  async getProfileByUserId(userId: number): Promise<RowDataPacket | null> {
    const query = 'SELECT * FROM profiles WHERE userId = ?';
    const [rows] = await pool.execute<RowDataPacket[]>(query, [userId]);
    return rows.length ? rows[0] : null;
  },
  // Add methods for retrieving and deleting profiles if needed
};
