import { RequestHandler } from 'express';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  getMatches: RequestHandler = async (req, res) => {
    const { inProgress } = req.query;
    if (inProgress === undefined) {
      const result = await MatchesService.findAll();
      return res.status(result.status).json(result.message);
    }
    if (inProgress === 'false') {
      const result = await MatchesService.findInProgress(false);
      return res.status(result.status).json(result.message);
    }
    const result = await MatchesService.findInProgress(true);
    return res.status(result.status).json(result.message);
  };

  patchMatchesResults: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const result = await MatchesService.MatchesResults(id, homeTeamGoals, awayTeamGoals);
    return res.status(result.status).json(result.message);
  };

  patchMatchesFinished: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const result = await MatchesService.MatchFinished(id);
    return res.status(result.status).json(result.message);
  };

  startMatch: RequestHandler = async (req, res) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const result = await MatchesService.MatchStart(
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
    );
    return res.status(result.status).json(result.message);
  };
}
