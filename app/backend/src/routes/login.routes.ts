import { Router } from 'express';
import UserController from '../controllers/user.controller';
import ValidateLogin from '../middlewares/ValidateLogin';

const loginRoute = Router();
const userController = new UserController();

loginRoute.post(
  '/',
  ValidateLogin.validateEmail,
  ValidateLogin.validatePassword,
  userController.userLogin,
);

export default loginRoute;
