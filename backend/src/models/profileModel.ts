//models/profileModel.ts
export interface Profile {
    id?: number;
    userId: number;
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



 
  