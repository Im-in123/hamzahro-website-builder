//services/userService.ts
import { User } from '../models/userModel';
import { UserRepository } from '../repositories/userRepository';
import bcrypt from 'bcrypt';

export const UserService = {
  async createUser(userData: User): Promise<User | null | string> {
    const existingUser = await UserRepository.findByEmail(userData.email);
   console.log("found::lit")
    if (existingUser) {
      if (existingUser.isEmailVerified) {
        return 'An account with this email already exists.';
      } else {
        return 'An account with this email exists but is not verified. Would you like to verify it?';
      }
    }

    return await UserRepository.createUser(userData);
  },
  async loginUser(credentials: { email: string; password: string }): Promise<User | null> {
      const user = await UserRepository.findByEmailAndPassword(credentials.email, credentials.password);

    if (user ) {
      return user;
    }

    return null;
  },

  async getUserById(userId: number): Promise<User | null> {
    return await UserRepository.findUserById(userId);
  },
  
  async updateUsername(userId: number, newUsername: string): Promise<User | null> {
    return await UserRepository.updateUserUsername(userId, newUsername);
  },


  // Add other service methods as needed

};
