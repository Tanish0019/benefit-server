import express from 'express';
import chatController from '../controllers/chat-controller';

let router = express.Router();

router.get('/' , chatController.getConversations);
router.get('/:conversationId', chatController.getConversation);
router.post('/:conversationId', chatController.sendMessage);
router.post('/new/:id', chatController.newConversation);

export default router ;