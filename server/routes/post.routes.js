import { Router } from 'express';
import { createPost, getPosts, getPost } from '../controllers/post.controller.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.post('/', auth, createPost);
router.get('/', getPosts);
router.get('/:id', getPost);

export default router;