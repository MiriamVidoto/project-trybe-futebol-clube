import { Router } from 'express';
import MatchesController from '../controllers/Matches.controller';

const matchesRoutes = Router();
const matchesController = new MatchesController();

matchesRoutes.get('/', matchesController.getMatches);
matchesRoutes.patch('/:id', matchesController.patchMatchesResults);
matchesRoutes.patch('/:id/finish', matchesController.patchMatchesFinished);

export default matchesRoutes;
