import express from 'express';
import nutritionController from "../controllers/nutrition-controller";

let router = express.Router();

router.get('/plan/get', nutritionController.getNutritionPlan);

export default router ;