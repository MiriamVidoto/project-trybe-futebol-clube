import MatchesModel from '../database/models/MatchModel';
import TeamsModel from '../database/models/TeamModel';
import { ILeaderBoard } from '../interfaces/ILeaderBoard';
import { IMatchesPoints } from '../interfaces/IMatchesPoints';
import { IMatchesDate } from '../interfaces/IMatchesDate';

export default class LeaderboardService {
  leaderBoard: ILeaderBoard[] = [];

  static getLeaderboard = async (team: string) => {
    const allTeams = await TeamsModel.findAll();
    const leaderBoard = await this.createLeaderboard(allTeams, team);
    return leaderBoard;
  };

  static sortLeaderboard = (leaderBoard: ILeaderBoard[]) => {
    const result = leaderBoard.sort(
      (a, b) =>
        b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn,
    );
    return result;
  };

  static matchesFinished = () => MatchesModel
    .findAll({
      where: { inProgress: false },
    });

  static pointsMatchesHome = (matches: MatchesModel[]) => {
    const data = matches.map((el) => {
      let totalPoints = 0;
      let totalVictories = 0;
      let totalDraws = 0;
      let totalLosses = 0;
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

  static pointsMatchesAway = (matches: MatchesModel[]) => {
    const data = matches.map((el) => {
      let totalPoints = 0;
      let totalVictories = 0;
      let totalDraws = 0;
      let totalLosses = 0;
      const id = el.awayTeam;
      if (el.awayTeamGoals > el.homeTeamGoals) {
        totalPoints += 3;
        totalVictories += 1;
      } else if (el.awayTeamGoals === el.homeTeamGoals) {
        totalPoints += 1;
        totalDraws += 1;
      } else {
        totalLosses += 1;
      }
      return { id, totalPoints, totalVictories, totalDraws, totalLosses };
    });
    return data;
  };

  static matchesDate = (matches: MatchesModel[], typeTeam: string) => {
    const data = matches.map((el) => {
      const id = typeTeam === 'home' ? el.homeTeam : el.awayTeam;
      const goalsFavor = typeTeam === 'home' ? el.homeTeamGoals : el.awayTeamGoals;
      const goalsOwn = typeTeam === 'home' ? el.awayTeamGoals : el.homeTeamGoals;
      const goalsBalance = typeTeam === 'home'
        ? el.homeTeamGoals - el.awayTeamGoals
        : el.awayTeamGoals - el.homeTeamGoals;
      return { id, goalsFavor, goalsOwn, goalsBalance };
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

  static getGoalsFavor = (id: number, matchesDate: IMatchesDate[]) => {
    const result = matchesDate.filter((el) => el.id === id)
      .reduce((acc, crr) => acc + crr.goalsFavor, 0);
    return result;
  };

  static getGoalsOwn = (id: number, matchesDate: IMatchesDate[]) => {
    const result = matchesDate.filter((el) => el.id === id)
      .reduce((acc, crr) => acc + crr.goalsOwn, 0);
    return result;
  };

  static getGoalsBalance = (id: number, matchesDate: IMatchesDate[]) => {
    const result = matchesDate.filter((el) => el.id === id)
      .reduce((acc, crr) => acc + crr.goalsBalance, 0);
    return result;
  };

  static getEfficiency = (id: number, matchesPoints: IMatchesPoints[]) => {
    const teamPoints = this.getTotalPoints(id, matchesPoints);
    const teamGames = this.getTotalGames(id, matchesPoints);
    const result = ((teamPoints / (teamGames * 3)) * 100).toFixed(2);
    return result;
  };

  static createLeaderboard = async (teams: TeamsModel[], typeTeam: string) => {
    const matchesPoints = typeTeam === 'home'
      ? this.pointsMatchesHome(await this.matchesFinished())
      : this.pointsMatchesAway(await this.matchesFinished());
    const matchesDate = this.matchesDate(await this.matchesFinished(), typeTeam);
    const leaderBoard = teams.map((team: TeamsModel) => ({
      name: team.teamName,
      totalPoints: this.getTotalPoints(team.id, matchesPoints),
      totalGames: this.getTotalGames(team.id, matchesPoints),
      totalVictories: this.getTotalVictories(team.id, matchesPoints),
      totalDraws: this.getTotalDraws(team.id, matchesPoints),
      totalLosses: this.getTotalLosses(team.id, matchesPoints),
      goalsFavor: this.getGoalsFavor(team.id, matchesDate),
      goalsOwn: this.getGoalsOwn(team.id, matchesDate),
      goalsBalance: this.getGoalsBalance(team.id, matchesDate),
      efficiency: this.getEfficiency(team.id, matchesPoints),
    }));
    return this.sortLeaderboard(leaderBoard);
  };
}
