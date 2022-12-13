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

  static async MatchFinished(id: string) {
    const response = await MatchModel.update(
      { inProgress: false },
      { where: { id } },
    );
    if (response[0] === 0) {
      return { status: 404, message: 'Match not found' };
    }
    return { status: 200, message: { message: 'Finished' } };
  }

  static async MatchesResults(id: string, homeTeamGoals: number, awayTeamGoals: number) {
    const response = await MatchModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    console.log(response);
    return { status: 200, message: 'Updated' };
  }
}
