import jwt, { JwtPayload } from 'jsonwebtoken'; // Import JwtPayload
import { Request, Response, NextFunction } from 'express';
import { ACCESS_TOKEN_SECRET } from '../config/env';
import { AccessTokenService } from '../services/accessTokenService';

export class AuthMiddleware {
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);

      // Verify the token using your secret key
      jwt.verify(token, ACCESS_TOKEN_SECRET!, async (err, decoded:any) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
        } else if (!decoded || typeof decoded.userId !== 'number') {
          return res.status(401).json({ message: 'Invalid token payload' });
        } else {
          // Token is valid, check if it exists in the database
          const existingToken = await AccessTokenService.findAccessTokenByToken(token);

          if (!existingToken) {
            return res.status(401).json({ message: 'Token not found' });
          }

          // Check if the decoded user ID matches the token's user_id
          if (decoded.userId !== existingToken.user_id) {
            return res.status(401).json({ message: 'Token does not match user' });
          }
        console.log("Decoded::", decoded)
          // Store the decoded user information in the request
          req.user = decoded;
          console.log("DDD")
          next();
        }
      });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}

declare module 'express-serve-static-core' {
    interface Request {
      user?: {
        userId: number; // Replace with the actual user properties you need
        // Add other user-related properties here as needed
      };
    }
}  
