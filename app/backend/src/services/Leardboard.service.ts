import MatchesModel from '../database/models/MatchModel';
import TeamsModel from '../database/models/TeamModel';
import { ILeaderBoard } from '../interfaces/ILeaderBoard';
import { IMatchesPoints } from '../interfaces/IMatchesPoints';

export default class LeaderboardService {
  leaderBoard: ILeaderBoard[] = [];

  matches = LeaderboardService.matchesPoints();

  static getLeaderboard = async () => {
    const allTeams = await TeamsModel.findAll();
    const matches = await this.matchesPoints();
    const result = this.createLeaderboard(allTeams, matches);
    return result;
  };

  static matchesPoints = async () => {
    const matchesFinished = await MatchesModel.findAll({
      where: { inProgress: false },
    });
    const matchesPoints = this.totalPointsHome(matchesFinished);
    return matchesPoints;
  };

  static totalPointsHome = (matches: MatchesModel[]) => {
    let totalPoints = 0;
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;
    const data = matches.map((el) => {
      const id = el.homeTeam;
      if (el.homeTeamGoals > el.awayTeamGoals) {
        totalPoints += 3;
        totalVictories += 1;
      } else if (el.homeTeamGoals === el.awayTeamGoals) {
        totalPoints += 1;
        totalDraws += 1;
      } else {
        totalLosses += 1;
      }
      return { id, totalPoints, totalVictories, totalDraws, totalLosses };
    });
    return data;
  };

  static getTotalPoints = (id: number, matchesPoints: IMatchesPoints[]) => {
    const result = matchesPoints.filter((el) => el.id === id)
      .reduce((acc, crr) => acc + crr.totalPoints, 0);
    return result;
  };

  static getTotalGames = (id: number, matchesPoints: IMatchesPoints[]) => {
    const result = matchesPoints.filter((el) => el.id === id);
    return result.length;
  };

  static getTotalVictories = (id: number, matchesPoints: IMatchesPoints[]) => {
    const result = matchesPoints.filter((el) => el.id === id)
      .reduce((acc, crr) => acc + crr.totalVictories, 0);
    return result;
  };

  static getTotalDraws = (id: number, matchesPoints: IMatchesPoints[]) => {
    const result = matchesPoints.filter((el) => el.id === id)
      .reduce((acc, crr) => acc + crr.totalDraws, 0);
    return result;
  };

  static getTotalLosses = (id: number, matchesPoints: IMatchesPoints[]) => {
    const result = matchesPoints.filter((el) => el.id === id)
      .reduce((acc, crr) => acc + crr.totalLosses, 0);
    return result;
  };

  static createLeaderboard = (teams: TeamsModel[], matchesPoints: IMatchesPoints[]) => {
    const leardboard = teams.map((team: TeamsModel) => ({
      name: team.teamName,
      totalPoints: this.getTotalPoints(team.id, matchesPoints),
      totalGames: this.getTotalGames(team.id, matchesPoints),
      totalVictories: this.getTotalVictories(team.id, matchesPoints),
      totalDraws: this.getTotalDraws(team.id, matchesPoints),
      totalLosses: this.getTotalLosses(team.id, matchesPoints),
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    }));
    return leardboard;
  };
}
