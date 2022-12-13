import * as jwt from 'jsonwebtoken';
import { IVerifyToken } from '../interfaces/IVerifyToken';

export default class JwtToken {
  static createToken(data:number): string {
    return jwt.sign(
      { data },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d', algorithm: 'HS256' },
    );
  }

  static validateToken(token:string) {
    try {
      const result = jwt.verify(token, process.env.JWT_SECRET as string) as IVerifyToken;
      return result.data;
    } catch (error) {
      return undefined;
    }
  }
}
