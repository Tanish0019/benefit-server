import express from 'express';

import authRouter from './auth' ;
import profileRoutes from './profile' ;
import mealLogRoutes from './meallog' ;
import trackingRoutes from './tracking';
import workoutROutes from './workout' ;

// CoachRoutes
import coachAuthRoutes from './coach/auth';

import authenticate from "../middlewares/authenticate";


let router = express.Router();


router.use('/auth', authRouter);
router.use('/profile', authenticate, profileRoutes);
router.use('/mealLog', authenticate, mealLogRoutes);
router.use('/tracking', authenticate, trackingRoutes);
router.use('/workout', authenticate ,workoutROutes);


router.use('/coach/auth', coachAuthRoutes);

router.get('/', (req, res) => {
    res.json({
        message: 'Hello world!'
    })
});

router.use(function (error, req, res, next) {
    res.json({
        success: false,
        mesage: error.message
    });
});

export default router;
