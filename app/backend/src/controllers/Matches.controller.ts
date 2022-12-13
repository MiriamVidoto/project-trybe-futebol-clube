import { RequestHandler } from 'express';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  getMatches: RequestHandler = async (req, res) => {
    const { inProgress } = req.query;
    if (inProgress === undefined) {
      const result = await MatchesService.findAll();
      return res.status(result.status).json(result);
    }
    console.log(inProgress);
    if (inProgress === 'false') {
      const result = await MatchesService.findInProgress(false);
      return res.status(result.status).json(result);
    }
    const result = await MatchesService.findInProgress(true);
    return res.status(result.status).json(result);
  };
}
