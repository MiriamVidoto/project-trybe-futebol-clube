import { Router } from 'express';
import LeardboardController from '../controllers/Leardboard.controller';

const leardboardRoutes = Router();
const leardboardController = new LeardboardController();

leardboardRoutes.get('/home', leardboardController.getLeaderBoardHouse);
leardboardRoutes.get('/away', leardboardController.getLeaderBoardAway);

export default leardboardRoutes;
