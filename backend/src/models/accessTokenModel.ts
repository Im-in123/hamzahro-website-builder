// accessTokenModel.ts
export interface AccessToken {
    id: number;
    user_id: number;
    token: string;
    expires_at: Date;
    created_at: Date;
  }
  