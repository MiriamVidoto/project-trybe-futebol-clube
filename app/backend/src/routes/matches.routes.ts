import { Router } from 'express';
import MatchesController from '../controllers/Matches.controller';

const matchesRoutes = Router();
const matchesController = new MatchesController();

matchesRoutes.get('/', matchesController.getMatches);

export default matchesRoutes;
