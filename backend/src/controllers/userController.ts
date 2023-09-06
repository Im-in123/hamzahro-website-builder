import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { User } from '../models/userModel';  
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET} from '../config/env';
import { AccessTokenService } from '../services/accessTokenService';

export const UserController = {
  async signup(req: Request, res: Response) {
    try {
      const { email, password, username } = req.body;
      
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d|\W).{8,}/.test(password)) {
        return res.status(400).json({
          message: 'Password must be at least 8 characters long and include at least one uppercase letter(A-Z), digit(0-9) or special symbol(@_*)',
          type: 'password'
        });
      }
      
      // Check if the email is valid using a simple regex pattern
      if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format', type:"email" });
      }
 
      // Create a User object with default values for isActive and isAdmin
      const now = new Date(); // Get current date and time

      const user: User = {
        username: username || email,
        email,
        password,
        createdAt:now,  
        updatedAt:now,
        isActive: true,
        isAdmin: false,
        isEmailVerified: false
      };
      

      const createdUser = await UserService.createUser(user);

      if (typeof createdUser === 'string') {
        if(createdUser === 'An account with this email already exists'){
          res.status(409).json({ message: createdUser });
        }
        else if(createdUser === 'An account with this email exists but is not verified. Would you like to verify it?'){
          console.log("string in here ")

          res.status(409).json({ message: createdUser, type:"reactivate" });

        }
        // Handle the response messages as needed
       } else if (createdUser) {
        res.status(200).json({ message: 'User signup successful' });
      } else {
        res.status(500).json({ message: 'Error creating user' });
      }
      

    } catch (error) {
      console.error('Error during user signup:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Call the login service function to validate credentials
      const user = await UserService.loginUser({ email, password });

      if (user) {
        // const ACCESS_TOKEN_SECRET = SECRET
        const accessToken = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET!, {
          expiresIn: '25m',
        });
        await AccessTokenService.createAccessToken(user.id!, accessToken, new Date(Date.now() + 15 * 60 * 1000), new Date());

        // res.status(200).json({ message: 'User login successful', user });
        res.json({ accessToken });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error during user login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  // Add other controller methods as needed
};
