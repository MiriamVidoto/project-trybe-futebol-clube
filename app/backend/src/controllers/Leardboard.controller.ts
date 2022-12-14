import { RequestHandler } from 'express';
import LeaderboardService from '../services/Leardboard.service';

export default class LeardboardController {
  getLeaderBoardHouse: RequestHandler = async (_req, res) => {
    const leaderBoardService = new LeaderboardService();
    const result = await leaderBoardService.getLeaderBoard('home');
    res.status(200).json(result);
  };
}
