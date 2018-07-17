import express from 'express';

import authRouter from './auth' ;
import profileRoutes from './profile' ;
import mealLogRoutes from './meallog' ;
import trackingRoutes from './tracking';
import workoutROutes from './workout' ;
import nutritionRoutes from './nutrition' ;
import chatRoutes from './chat' ;
import paymentRoutes from './payment' ;

// CoachRoutes
import coachRoutes from './coach/index';
import authenticate from "../middlewares/authenticate";


let router = express.Router();


router.use('/auth', authRouter);
router.use('/profile', authenticate, profileRoutes);
router.use('/mealLog', authenticate, mealLogRoutes);
router.use('/tracking', authenticate, trackingRoutes);
router.use('/workout', authenticate ,workoutROutes);
router.use('/nutrition', authenticate ,nutritionRoutes);
router.use('/chat', authenticate ,chatRoutes);
router.use('/payment', authenticate ,paymentRoutes);


router.use('/coach/' ,coachRoutes);

router.get('/', (req, res) => {
    res.json({
        message: 'Hello world!'
    })
});

router.use(function (error, req, res, next) {
    res.json({
        success: false,
        message: error.message
    });
});

export default router;
