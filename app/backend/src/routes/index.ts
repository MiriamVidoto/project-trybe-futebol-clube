import { Router } from 'express';
import loginRoutes from './login.routes';
import teamsRoutes from './teams.routes';
import matchesRoutes from './matches.routes';
import leardboardRoutes from './leardboard.routes';

const routes = Router();

routes.use('/login', loginRoutes);
routes.use('/teams', teamsRoutes);
routes.use('/matches', matchesRoutes);
routes.use('/leaderboard', leardboardRoutes);

export default routes;
