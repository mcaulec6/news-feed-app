import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../lib/api";
import type { Article } from "../types";
import { AppShell } from "../components/AppShell";

export function ArticleDetail() {
  const { id } = useParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setError(null);
      setLoading(true);
      try {
        const res = await api.getArticles();
        setArticles(res.articles);
      } catch (err: any) {
        setError(err.message || "Failed to load article");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const article = useMemo(
    () => articles.find((a) => a.id === id),
    [articles, id]
  );

  return (
    <AppShell>
      <div className="mb-4">
        <Link className="underline text-sm" to="/articles">
          ← Back to articles
        </Link>
      </div>

      {loading && <div className="text-sm text-gray-600">Loading…</div>}
      {error && <div className="rounded bg-red-100 p-3 text-sm">{error}</div>}

      {!loading && !error && !article && (
        <div className="rounded border bg-white p-6">
          <div className="font-semibold">Article not found</div>
          <p className="mt-2 text-sm text-gray-600">
            Try refreshing the articles list.
          </p>
        </div>
      )}

      {article && (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="text-sm text-gray-500">
            {article.sourceName} • {new Date(article.publishedAt).toLocaleString()}
          </div>

          <h1 className="mt-2 text-2xl font-semibold">{article.title}</h1>

          <div className="mt-2 text-sm text-gray-700">
            Author: {article.author ?? "Unknown"}
          </div>

          {article.description && (
            <p className="mt-4 text-gray-800">{article.description}</p>
          )}

          <a
            className="mt-6 inline-block rounded bg-black px-4 py-2 text-white hover:opacity-90"
            href={article.url}
            target="_blank"
            rel="noreferrer"
          >
            Open original article
          </a>
        </div>
      )}
    </AppShell>
  );
}
