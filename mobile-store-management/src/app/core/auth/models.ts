export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface TokenResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  refreshTokenIssued?: boolean;
  user?: User;
  permission_set_id?: string;
}
