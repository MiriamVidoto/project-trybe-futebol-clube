import MatchesModel from '../database/models/MatchModel';
import TeamsModel from '../database/models/TeamModel';
import { ILeaderBoard } from '../interfaces/ILeaderBoard';

export default class LeaderboardService {
  leaderBoard: ILeaderBoard[] = [];
  static getLeaderboard = async (filter: string) => {
    const allTeams = await TeamsModel.findAll();
    console.log(filter);
    console.log(allTeams);
    const matchesHomeFinished = await MatchesModel.findAll({
      where: { inProgress: false },
    });

    return matchesHomeFinished;
  };
}
