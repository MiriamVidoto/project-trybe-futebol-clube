import UserModel from '../database/models/UserModel';

class UserService {
  constructor(private _userModel = UserModel) {}

  public async findByEmail(email: string): Promise<UserModel | null> {
    const result = await this._userModel.findOne({ where: { email } });
    return result;
  }

  public async findById(id: number): Promise<UserModel> {
    const result = await this._userModel.findOne({ where: { id } });
    return result as UserModel;
  }
}

export default UserService;
