import { Router } from 'express';
import loginRoute from './login.routes';

const routes = Router();

routes.use('/login', loginRoute);

export default routes;
