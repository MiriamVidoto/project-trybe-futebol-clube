import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const teamsRoutes = Router();
const teamsController = new TeamsController();

teamsRoutes.get('/', teamsController.getAllTeams);
teamsRoutes.get('/:id', teamsController.getById);

export default teamsRoutes;
