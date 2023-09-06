// profileController.ts

import { Request, Response } from 'express';
import { ProfileService } from '../services/profileService';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET} from '../config/env';
import { AccessTokenService } from '../services/accessTokenService';
import { UserService } from '../services/userService';
import { serializeProfile, serializeUser, serializeUserProfile } from '../serializers/serializer';

export const ProfileController = {
    async createProfile(req: Request, res: Response) {
        try {
          const userId = req.user?.userId;

          if (!userId) {
            return res.status(401).json({ message: 'Unauthorized access' });
          }
          const user = await UserService.getUserById(userId);
          console.log("user::", user)
          

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
         // Check if all required profile data fields are present
         const {username, firstName, lastName, birthDate, city, state, country, avatar } = req.body;

         if (!username || !firstName || !lastName || !birthDate || !country  ) {
           return res.status(400).json({ message: 'Missing required profile data fields' });
         }
   
         // Add the user ID to the profile data
         const now = new Date()
         const profileData = {
           userId,
           firstName,
           lastName,
           birthDate,
           city: city || "",
           state: state || "",
           country,
           avatar: avatar || "",
           createdAt:now,  
           updatedAt:now,
         };
     
          
          console.log("profileData::", profileData)
          // Now you can save the profileData to your database
          const savedProfile = await ProfileService.createProfile(profileData);
          console.log("savedprofile:::", savedProfile)
    
          if (savedProfile) {
            const updusr = await UserService.updateUsername(userId, username);
            console.log("updated user::", updusr)

            res.status(201).json({ message: 'Profile created successfully', profile: savedProfile });
          } else {
            res.status(500).json({ message: 'Error creating profile' });
          }
        } catch (error) {
          console.error('Error during profile submission:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      },

  async updateProfile(req: Request, res: Response) {
    try {
      const profileData = req.body; // Assuming the updated profile data is sent in the request body
      const updatedProfile = await ProfileService.updateProfile(profileData);

      if (updatedProfile) {
        res.status(200).json({ message: 'Profile updated successfully', profile: updatedProfile });
      } else {
        res.status(500).json({ message: 'Error updating profile' });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  async getUserProfile(req: Request, res: Response) {
    try {
      // Extract the user ID from the request (e.g., from headers or token)
      const userId = req.user?.userId; // Adjust this based on how you store the user ID in your requests
  
      if (!userId) {
        return res.status(401).json({ message: 'User ID not found in the request' });
      }
  
      const user = await UserService.getUserById(userId)
      if (!user ) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Retrieve the user's profile from the database
      const profile = await ProfileService.getProfileByUserId(userId);
      
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      // Serialize the profile to the desired format
       
      const serialzedUserProfile = serializeUserProfile(user, profile)
  
      // Send the serialized profile as the response
      res.status(200).json({ userProfile: serialzedUserProfile });
    } catch (error) {
      console.error('Error while fetching user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  // Add methods for retrieving and deleting profiles if needed
};
