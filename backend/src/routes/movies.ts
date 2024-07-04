import express from 'express';
import { getMovies, getMovieById, addMovie, addComment, deleteComment,getComments } from '../controllers/movieController';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getMovies);
router.get('/:id', getMovieById);
router.post('/', adminMiddleware, addMovie);
router.post('/:id/comments', authMiddleware, addComment);
router.get('/:movieId/comments', getComments); 
router.delete('/:movieId/comments/:commentId', adminMiddleware, deleteComment);

export default router;
