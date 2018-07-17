import express from 'express';
let router = express.Router();

import paymentController from '../controllers/payment-controller';

router.get('/token' , paymentController.getAccessToken);

export default router ;