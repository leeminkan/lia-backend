export class TokenResponse {
  token: string;
  refreshToken: string;
  tokenExpires: number;

  constructor(data: Partial<TokenResponse>) {
    Object.assign(this, data);
  }
}
