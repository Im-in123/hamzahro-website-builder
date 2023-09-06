// accessTokenService.ts
import { AccessTokenRepository } from '../repositories/accessTokenRepository';
import { AccessToken } from '../models/accessTokenModel';

export const AccessTokenService = {
  async createAccessToken(userId: number, token: string, expiresAt: Date, createdAt: Date): Promise<void> {
    await AccessTokenRepository.createAccessToken(userId, token, expiresAt, createdAt);
  },

  
   async findAccessTokenByToken(token: string): Promise<any> {
    const rows = await AccessTokenRepository.findAccessTokenByToken(token);

    // Handle the case when no token is found or rows is null
    if (!rows || !rows.length) {
      return null;
    }
    console.log("firtrow:", rows[0])
    // Process and return the token if found
    return rows[0] ;
  },

  
  
  async deleteAccessTokenByUserId(userId: number): Promise<void> {
    await AccessTokenRepository.deleteAccessTokenByUserId(userId);

  },  
    async deleteAllAccessTokensByUserId(userId: number): Promise<void> {
    await AccessTokenRepository.deleteAllAccessTokensByUserId(userId);
  },
};


