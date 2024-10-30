export type JwtPayloadType = {
  customerId: number;
  sessionId: string;
  iat: number;
  exp: number;
};
