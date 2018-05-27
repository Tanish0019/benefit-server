import express from 'express';
import profileController from "../controllers/profile-controller";

let router = express.Router();

router.post('/update', profileController.update);
// router.post('/get', profileController.get);

export default router ;