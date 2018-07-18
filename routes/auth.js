import express from 'express';
import authenticate from "../middlewares/authenticate";

let router = express.Router();

import authController from '../controllers/auth-controller';

router.post('/signup', authController.signup);
router.post('/login/google', authController.googleLogin);
router.post('/login/facebook', authController.facebookLogin);
router.post('/login', authController.login);
router.post('/changePassword', authenticate, authController.changePassword);

export default router ;