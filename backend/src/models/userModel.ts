
//models/userModel.ts
export interface User {
  id?: number;
  username?: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
  isAdmin: boolean;
  isEmailVerified:boolean
}


 
