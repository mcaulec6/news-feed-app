import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/authMiddleware";
import { getKeywords } from "../services/keywordService";
import { fetchArticlesForKeywords } from "../services/newsService";

export async function listArticles(req: AuthenticatedRequest, res: Response) {
  try {
    const keywords = getKeywords(req.userId!);

    if (!keywords || !keywords.length) {
      return res.json({ keywords, articles: [] });
    }

    const articles = await fetchArticlesForKeywords(keywords);
    return res.json({ keywords, articles });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || "Failed to fetch articles" });
  }
}
