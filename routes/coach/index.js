import express from 'express';

import coachAuthRoutes from './auth';
import coachClientRoutes from './client' ;
import coachExerciseRoutes from './exercise' ;
import coachWorkoutRoutes from './workout' ;
import coachNutritionRoutes from './nutrition' ;
import coachAuthenticate from "../../middlewares/coachAuthenticate";

let router = express.Router();

router.use('/auth', coachAuthRoutes);
router.use('/clients' , coachAuthenticate , coachClientRoutes);
router.use('/exercise' , coachAuthenticate , coachExerciseRoutes);
router.use('/workout' , coachAuthenticate , coachWorkoutRoutes);
router.use('/nutrition' , coachAuthenticate , coachNutritionRoutes);

export default router;
