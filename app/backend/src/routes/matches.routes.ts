import { Router } from 'express';
import MatchesController from '../controllers/Matches.controller';
import AuthoriziationLogin from '../middlewares/AuthorizationLogin';

const matchesRoutes = Router();
const matchesController = new MatchesController();

matchesRoutes.get('/', matchesController.getMatches);
matchesRoutes.patch('/:id', matchesController.patchMatchesResults);
matchesRoutes.patch('/:id/finish', matchesController.patchMatchesFinished);
matchesRoutes.post('/', AuthoriziationLogin.validateAuthorization, matchesController.startMatch);

export default matchesRoutes;
