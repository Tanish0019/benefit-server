import express from 'express';
import nutritionController from '../../controllers/coach/nutrition-controller';

let router = express.Router();


router.post('/user/add', nutritionController.addUserNutrition);
router.get('/user/search', nutritionController.getUserNutritionPlan);


router.post('/add', nutritionController.addNutrition);


export default router ;