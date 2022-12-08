import * as bycrypt from 'bcryptjs';
import { IResultService } from '../interfaces/IRerultService';
import UserModel from '../database/models/UserModel';
import JwtToken from '../utils/JwtToken';

class UserService {
  constructor(private _userModel = UserModel) {}

  public async findByEmail(email: string): Promise<UserModel | null> {
    const result = await this._userModel.findOne({ where: { email } });
    return result;
  }

  public async loginService(email: string, password: string): Promise<IResultService> {
    if (!email || !password) return { status: 400, message: 'All fields must be filled' };
    const result = await this.findByEmail(email);
    if (result === null) return { status: 401, message: 'Incorrect email or password' };
    const validatePassword = await bycrypt.compare(password, result.password);
    if (!validatePassword) return { status: 401, message: 'Incorrect email or password' };
    return { status: 200, message: { token: JwtToken.createToken(result.id) } };
  }
}

export default UserService;
