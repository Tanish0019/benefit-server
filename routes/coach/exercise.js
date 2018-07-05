import express from 'express';

import workoutController from '../../controllers/coach/workout-controller' ;
let router = express.Router();

router.get( '/search', workoutController.searchExercise);

export default router;
