import express from 'express';
let router = express.Router();

import authController from '../../controllers/coach/auth-controller';

router.post('/signup', authController.signup);
router.post('/login', authController.login);

export default router;