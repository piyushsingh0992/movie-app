import express from 'express';
import { register, login, addFavorite, removeFavorite, getUserProfile } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getUserProfile);
router.post('/favorites/:id', authMiddleware, addFavorite);
router.delete('/favorites/:id', authMiddleware, removeFavorite);

export default router;
