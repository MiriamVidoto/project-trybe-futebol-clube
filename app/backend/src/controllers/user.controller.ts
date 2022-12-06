import { RequestHandler } from 'express';
import UserService from '../services/user.service';

export default class userLoginController {
  constructor(private _userService = new UserService()) {}

  userLogin: RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    console.log(password, email);
    const result = await this._userService.findByEmail(email);
    if (result === null) return res.status(401).json({ message: 'INVALID_FIELDS' });
    return res.status(200).json('oioioid');
  };
}
