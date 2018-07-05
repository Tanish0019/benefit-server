import express from 'express';

import coachAuthRoutes from './auth';
import coachClientRoutes from './client' ;
import coachWorkoutRoutes from './exercise' ;
import coachAuthenticate from "../../middlewares/coachAuthenticate";

let router = express.Router();

router.use('/auth', coachAuthRoutes);
router.use('/clients' , coachAuthenticate , coachClientRoutes);
router.use('/exercise' , coachAuthenticate , coachWorkoutRoutes);

export default router;
