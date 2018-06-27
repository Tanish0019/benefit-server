import express from 'express';
import workoutController from '../controllers/workout-controller' ;


let router = express.Router();

// TODO: Remove this route.
router.get('/exercise/list', workoutController.getExerciseList);
router.get('/exercise/', workoutController.getSignedUrl);
router.get('/exercise/import', workoutController.importExercises);


router.post('/user/add', workoutController.addUserWorkout);
router.get('/user/get', workoutController.getUserWorkout);


router.post('/add', workoutController.addWorkout);


export default router ;