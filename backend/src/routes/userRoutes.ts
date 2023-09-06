//routes/userRoutes.ts
import express from 'express';
import { UserController } from '../controllers/userController';

const userRouter = express.Router();

// Define the user signup route
userRouter.post('/signup', UserController.signup);
userRouter.post('/login', UserController.login);  

// Add other routes as needed

export default userRouter;
