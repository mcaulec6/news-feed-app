import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { listArticles  } from '../controllers/articleController';

const router = Router();

router.get('/', authMiddleware, listArticles);

export default router;