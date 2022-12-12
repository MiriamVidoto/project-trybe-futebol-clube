import { Router } from 'express';
import loginRoutes from './login.routes';
import teamsRoutes from './teams.routes';

const routes = Router();

routes.use('/login', loginRoutes);
routes.use('/teams', teamsRoutes);

export default routes;
