// src/types/index.ts
export interface User {
 
  username?: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
  isAdmin: boolean;
  isEmailVerified:boolean;
  profile: Profile | null
  }
  
export interface Profile{
  firstName: string;
  lastName: string;
  birthDate: Date;
  city: string;
  state: string;
  country: string;
  createdAt?: Date;
  updatedAt?: Date;
  avatar: string;
}
  export interface UserState {
    user: User | null;
  }
  
  export type UserActionType =
    | { type: 'SET_USER'; payload: User }
    | { type: 'CLEAR_USER' };
  