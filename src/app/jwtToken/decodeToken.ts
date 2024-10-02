import { JwtPayload } from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token: string) => {
  const decoded = jwtDecode(token) as JwtPayload;
  return decoded;
};
