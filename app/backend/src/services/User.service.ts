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

  public async findById(id: number): Promise<UserModel | null> {
    const result = await this._userModel.findOne({ where: { id } });
    return result;
  }

  public async loginService(email: string, password: string): Promise<IResultService> {
    const result = await this.findByEmail(email);
    if (result === null) {
      return { status: 401, message: { message: 'Incorrect email or password' } };
    }
    const validatePassword = await bycrypt.compare(password, result.password);
    if (!validatePassword) {
      return { status: 401, message: { message: 'Incorrect email or password' } };
    }
    return { status: 200, message: { token: JwtToken.createToken(result.id) } };
  }

  public async loginAuthorization(id: number): Promise<IResultService> {
    const result = await this.findById(id);
    console.log(result);
    if (result !== null) {
      return { status: 200, message: { role: result.role } };
    }
    return { status: 401, message: { message: 'Token is not valid' } };
  }
}

export default UserService;
