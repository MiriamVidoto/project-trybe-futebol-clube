import { RequestHandler } from 'express';
import JwtToken from '../utils/JwtToken';

export default class AuthoriziationLogin {
  static validateAuthorization: RequestHandler = (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const id = JwtToken.validateToken(authorization);
    req.body.id = id;
    if (id === undefined) return { status: 401, message: { message: 'Token is not valid' } };
    next();
  };
}
