// profileService.ts

import { Profile } from '../models/profileModel';
import { ProfileRepository } from '../repositories/profileRepository';

export const ProfileService = {
  async createProfile(profileData: Profile): Promise<Profile | null> {
    return await ProfileRepository.createProfile(profileData);
  },

  async updateProfile(profileData: Profile): Promise<Profile | null> {
    return await ProfileRepository.updateProfile(profileData);
  },
  async getProfileByUserId(userId: number): Promise<Profile | null> {
    const row = await ProfileRepository.getProfileByUserId(userId);
    if (row) {
      // You can further format or manipulate the data here if needed
      return {
        id: row.id,
        userId: row.userId,
        firstName: row.firstName,
        lastName: row.lastName,
        birthDate: row.birthDate,
        city: row.city,
        state: row.state,
        country: row.country,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        avatar: row.avatar,
      };
    }
    return null;
  },
  // Add methods for retrieving and deleting profiles if needed
};
