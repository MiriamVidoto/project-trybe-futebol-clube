import { RequestHandler } from 'express';
import LeaderboardService from '../services/Leardboard.service';

export default class LeardboardController {
  // getLeaderBoardHouse: RequestHandler = async (_req, res) => {
  //   const result = await LeaderboardService.getLeaderboard('home');
  //   res.status(200).json(result);
  // };

  getLeaderBoard: RequestHandler = async (_req, res) => {
    const result = await LeaderboardService.getLeaderboard();
    res.status(200).json(result);
  };
}
