import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import { ILeaderBoard } from '../interfaces/ILeaderBoard';

export default class LeaderBoardService {
  leaderBoard: ILeaderBoard[] = [];
  getLeaderBoard = async (filter: string) => {
    this.leaderBoard = [];
    const allTeams = await Team.findAll();
    this.leaderBoard = allTeams.map((team: Team) => ({
      name: team.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0.00,
    }));
    await this.generateInfoLeaderBoard(filter);
    this.sortLeaderBoard();
    return this.leaderBoard;
  };

  sortLeaderBoard() {
    this.leaderBoard.sort(
      (a, b) =>
        b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn,
    );
  }

  setHomePoints(homeTeamIndex: number, match: Match) {
    const teamStats = this.leaderBoard[homeTeamIndex];

    if (match.homeTeamGoals > match.awayTeamGoals) {
      teamStats.totalPoints += 3;
      teamStats.totalVictories += 1;
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      teamStats.totalPoints += 1;
      teamStats.totalDraws += 1;
    } else {
      teamStats.totalLosses += 1;
    }
  }

  async generateInfoLeaderBoard(filter: string) {
    const allFinishMatches = await Match.findAll({
      where: { inProgress: false },
    });
    if (filter === 'home') {
      allFinishMatches.forEach((match: Match) => {
        const homeTeamIndex = allFinishMatches.findIndex(
          (team) => team.id === match.dataValues.homeTeam,
        );
        const teamStats = this.leaderBoard[homeTeamIndex];
        teamStats.totalGames += 1;
        teamStats.goalsFavor += match.homeTeamGoals;
        teamStats.goalsOwn += match.awayTeamGoals;
        teamStats.goalsBalance = teamStats.goalsFavor - teamStats.goalsOwn;
        this.setHomePoints(homeTeamIndex, match);
        teamStats.efficiency = +((teamStats.totalPoints / (teamStats.totalGames * 3)) * 100
        ).toFixed(2);
      });
    }
  }
}
