import { Profile } from "../models/profileModel";
import { User } from "../models/userModel";

 
// Serialize User model
export function serializeUser(user: User): Record<string, any> {
  return {
    // id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    isActive: user.isActive,
    isAdmin: user.isAdmin,
    isEmailVerified: user.isEmailVerified,
  };
}

// Serialize Profile model
export function serializeProfile(profile: Profile): Record<string, any> {
  return {
    // id: profile.id,
    // userId: profile.userId,
    firstName: profile.firstName,
    lastName: profile.lastName,
    birthDate: profile.birthDate,
    city: profile.city,
    state: profile.state,
    country: profile.country,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
    avatar: profile.avatar,
  };
}

// Serialize UserProfile (User with Profile) model
export function serializeUserProfile(user: User, profile: Profile): Record<string, any> {
  const serializedUser = serializeUser(user);
  const serializedProfile = serializeProfile(profile);
  return {
    ...serializedUser,
    profile: serializedProfile,
  };
}
