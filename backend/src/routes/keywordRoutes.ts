import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { listKeywords, createKeyword, deleteKeyword } from '../controllers/keywordController';

const router = Router();

router.get('/', authMiddleware, listKeywords);
router.post('/', authMiddleware, createKeyword);
router.delete('/:keyword', authMiddleware, deleteKeyword);

export default router;