import { Router } from 'express';
import UserController from '../controllers/user.controller';

const loginRoute = Router();
const userController = new UserController();

loginRoute.post('/', userController.userLogin);

export default loginRoute;
