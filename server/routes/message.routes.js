import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as messageController from '../controllers/message.controller.js';

const router = Router();

router.use(authenticate); // Tüm mesaj route'ları için authentication gerekli

router.get('/conversations', messageController.getConversations);
router.get('/conversations/:userId', messageController.getConversation);
router.post('/conversations/:userId', messageController.sendMessage);
router.put('/conversations/:userId/read', messageController.markAsRead);

export default router;