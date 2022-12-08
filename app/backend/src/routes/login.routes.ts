import { Router } from 'express';
import AuthoriziationLogin from '../middlewares/AuthorizationLogin';
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

loginRoute.get(
  '/validate',
  AuthoriziationLogin.validateAuthorization,
  userController.userAuthorization,
);

export default loginRoute;
