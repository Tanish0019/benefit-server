import express from 'express';
import mealLogController from "../controllers/meal-log-controller";

let router = express.Router();

router.get('/import', mealLogController.importItems);
router.get('/food/search/:keyword', mealLogController.searchFoodItem);
router.get('/details/:type', mealLogController.getTypeDate);

router.post('/details/:type', mealLogController.postMealLog)

export default router ;