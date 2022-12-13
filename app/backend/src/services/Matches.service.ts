import { IResultService } from '../interfaces/IRerultService';
import MatchModel from '../database/models/MatchModel';

export default class MatchesService {
  static async findAll(): Promise<IResultService> {
    const result = await MatchModel.findAll({
      include: {
        all: true,
        attributes: { exclude: ['id'] },
      },
    });
    return { status: 200, message: result as [] };
  }

  static async findInProgress(inProgress: boolean): Promise<IResultService> {
    const result = await MatchModel.findAll({
      where: { inProgress },
      include: {
        all: true,
        attributes: { exclude: ['id'] },
      },
    });
    return { status: 200, message: result as [] };
  }
}
