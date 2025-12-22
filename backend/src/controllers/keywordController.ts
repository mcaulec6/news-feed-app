import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/authMiddleware';
import { addKeyword, getKeywords, removeKeyword } from '../services/keywordService';

export function listKeywords(req: AuthenticatedRequest, res: Response) {
    try {
        const userId = req.userId!;
        const keywords = getKeywords(userId);
        res.json({ keywords });
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}

export function createKeyword(req: AuthenticatedRequest, res: Response) {
    try {
        const userId = req.userId!;
        const { keyword } = req.body;
        const keywords = addKeyword(userId, keyword);
        res.status(201).json({ keywords });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

export function deleteKeyword(req: AuthenticatedRequest, res: Response) {
    try {
        const userId = req.userId!;
        const { keyword } = req.body;
        const keywords = removeKeyword(userId, keyword);
        res.json({ keywords });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}