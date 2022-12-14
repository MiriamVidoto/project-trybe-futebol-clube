import MatchesModel from '../database/models/MatchModel';
import TeamsModel from '../database/models/TeamModel';
import { ILeaderBoard } from '../interfaces/ILeaderBoard';

export default class LeaderboardService {
  leaderBoard: ILeaderBoard[] = [];
  static getLeaderboard = async () => {
    const allTeams = await TeamsModel.findAll();

    const leaderboard = this.createLeaderboard(allTeams as []);
    console.log(leaderboard);
    const matchesFinished = await MatchesModel.findAll({
      where: { inProgress: false },
    });

    const matchesHomeFinished = allTeams
      .map((team) => matchesFinished
        .filter((match) => match.homeTeam === team.id));

    // const test = this.GetDataLeaderboard(matchesHomeFinished);

    return matchesHomeFinished;
  };

  static createLeaderboard = (teams: []) => {
    const leardboard = teams.map((team: TeamsModel) => ({
      name: team.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    }));
    return leardboard;
  };

  static GetDataLeaderboard = (matches: [][]) => {
    const result = matches
      .map((match) => {
        const resultMatches = this.totalPointsHome(match);
        return resultMatches;
      });
    return result;
  };

  static totalPointsHome = (match: MatchesModel[]) => {
    console.log(match);
    const totalPoints = 0;
    const totalVictories = 0;
    const totalDraws = 0;
    const totalLosses = 0;
    // if (match.homeTeamGoals > match.awayTeamGoals) {
    //   totalPoints += 3;
    //   totalVictories += 1;
    // } else if (match.homeTeamGoals === match.awayTeamGoals) {
    //   totalPoints += 1;
    //   totalDraws += 1;
    // } else {
    //   totalLosses += 1;
    // }
    return { totalPoints, totalVictories, totalDraws, totalLosses };
  };
}
