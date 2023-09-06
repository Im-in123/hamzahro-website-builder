// profileRoutes.ts

 
import express from 'express';
import { ProfileController } from '../controllers/profileController';
import { AuthMiddleware } from '../middlewares/authMiddleware'; // Import the middleware class

const profileRouter= express.Router();

// Protect the profile update route with authentication middleware
profileRouter.post('/create', AuthMiddleware.verifyToken, ProfileController.createProfile);

profileRouter.put('/update-profile', AuthMiddleware.verifyToken, ProfileController.updateProfile);
profileRouter.get('/get-user-profile', AuthMiddleware.verifyToken, ProfileController.getUserProfile);

// Other routes...

export default profileRouter;
