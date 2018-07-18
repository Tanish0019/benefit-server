import express from 'express';
import trackingController from "../controllers/trackingController";

let router = express.Router();

router.get('/details', trackingController.getDetails);
router.post('/details', trackingController.postDetails);

export default router ;