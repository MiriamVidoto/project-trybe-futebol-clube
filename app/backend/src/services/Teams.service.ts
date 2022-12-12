import TeamModel from '../database/models/TeamModel';
import { IResultService } from '../interfaces/IRerultService';

export default class TeamsService {
  static async findAll(): Promise<IResultService> {
    const result = await TeamModel.findAll();
    return { status: 200, message: result as [] };
  }

  static async findById(id: string): Promise<IResultService> {
    const result = await TeamModel.findOne({ where: { id } });
    return { status: 200, message: result?.dataValues };
  }
}
