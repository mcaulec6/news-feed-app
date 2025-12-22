import axios from 'axios';
import type { Article } from '../models/Article';

const NEWS_API_KEY = process.env.NEWS_API_KEY!;
const NEWS_API_URL = process.env.NEWS_API_URL!;

function buildQuery(keywords: string[]): string {
  const cleaned = keywords
    .map(k => k.trim())
    .filter(Boolean)
    .map(k => (k.includes(" ") ? `"${k}"` : k));

  return cleaned.length ? cleaned.join(" OR ") : "";
}

function stableIdFromUrl(url: string): string {
  return Buffer.from(url).toString("base64url");
}

export async function fetchArticlesForKeywords(keywords: string[]): Promise<Article[]> {
  const q = buildQuery(keywords);

  if (!q) return [];

  const resp = await axios.get(`${NEWS_API_URL}/everything`, {
    params: {
      q,
      language: "en",
      sortBy: "publishedAt",
      pageSize: 20,
    },
    headers: {
      "X-Api-Key": NEWS_API_KEY,
    },
    timeout: 7000,
  });

  const items = resp.data?.articles ?? [];

  return items
    .filter((a: any) => a?.title && a?.url)
    .map((a: any) => ({
      id: stableIdFromUrl(a.url),
      title: a.title,
      author: a.author ?? null,
      description: a.description ?? null,
      url: a.url,
      urlToImage: a.urlToImage ?? null,
      publishedAt: a.publishedAt,
      sourceName: a.source?.name ?? "Unknown",
    }));
}