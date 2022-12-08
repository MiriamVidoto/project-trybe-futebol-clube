import { RequestHandler } from 'express';

export default class ValidateLogin {
  static validateEmail: RequestHandler = async (req, res, next) => {
    const { email } = req.body;
    const regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!regex.test(email)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
  };

  static validatePassword: RequestHandler = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (password.length <= 6) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
  };
}
