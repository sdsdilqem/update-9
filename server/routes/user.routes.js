import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as userController from '../controllers/user.controller.js';

const router = Router();

router.get('/profile', authenticate, userController.getProfile);
router.put('/profile', authenticate, userController.updateProfile);
router.get('/:username', userController.getUserByUsername);
router.get('/:userId/products', userController.getUserProducts);

export default router;