import { RequestHandler } from 'express';
import JwtToken from '../utils/JwtToken';

export default class AuthoriziationLogin {
  static validateAuthorization: RequestHandler = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const id = JwtToken.validateToken(authorization);
    if (id === undefined) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    req.body.id = id;
    next();
  };
}
