import { RequestHandler } from 'express';
import TeamsService from '../services/Teams.service';

export default class TeamsController {
  getAllTeams: RequestHandler = async (_req, res) => {
    const result = await TeamsService.findAll();
    return res.status(result.status).json(result.message);
  };

  getById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const result = await TeamsService.findById(id);
    return res.status(result.status).json(result.message);
  };
}
