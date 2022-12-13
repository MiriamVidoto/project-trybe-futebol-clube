import { IResultService } from '../interfaces/IRerultService';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

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
    await MatchModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return { status: 200, message: 'Updated' };
  }

  static async VerifyTeams(homeTeam:number, awayTeam:number) {
    const verifyHomeTeam = await TeamModel.findByPk(homeTeam);
    const verifyAwayTeam = await TeamModel.findByPk(awayTeam);

    if (!verifyHomeTeam || !verifyAwayTeam) {
      return { status: 200, message: { message: 'There is no team with such id!' } };
    }
    if (homeTeam === awayTeam) {
      return { status: 200,
        message: { message: 'It is not possible to create a match with two equal teams' },
      };
    }
    return 'ok';
  }

  static async createMatch(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const response = await MatchModel.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true,
    });
    return { status: 201, message: response };
  }

  static async MatchStart(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const verify = await this.VerifyTeams(homeTeam, awayTeam);
    if (verify === 'ok') {
      return this.createMatch(
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
      );
    }
    return verify;
  }
}
