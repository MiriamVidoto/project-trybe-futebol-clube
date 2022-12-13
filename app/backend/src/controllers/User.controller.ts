import { RequestHandler } from 'express';
import UserService from '../services/User.service';

export default class userLoginController {
  constructor(private _userService = new UserService()) {}

  userLogin: RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    const result = await this._userService.loginService(email, password);
    return res.status(result.status).json(result.message);
  };

  userAuthorization: RequestHandler = async (req, res) => {
    const id = req.body;
    const result = await this._userService.loginAuthorization(id);
    return res.status(result.status).json(result.message);
  };
}
