import express from 'express';
import profileController from "../controllers/profile-controller";

let router = express.Router();

router.get('/', profileController.get);
router.post('/update', profileController.update);

router.post('/measurements', profileController.editMeasurements);
router.get('/measurements/history', profileController.measurementsHistory);
router.get('/measurements/latest', profileController.measurementsLatest);

export default router ;