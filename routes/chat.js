import express from 'express';
let router = express.Router();

import chatController from '../controllers/chat-controller';
router.get('/fetch' , chatController.fetchRoom);

export default router ;