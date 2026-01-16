import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import type { Article } from "../types";
import { AppShell } from "../components/AppShell";

export function Articles() {
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setError(null);
    setLoading(true);
    try {
      const kw = await api.getKeywords();
      setKeywords(kw.keywords);

      const res = await api.getArticles();
      setArticles(res.articles);
    } catch (err: any) {
      setError(err.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function addKeyword() {
    const k = keywordInput.trim();
    if (!k) return;
    setError(null);
    try {
      const res = await api.addKeyword(k);
      setKeywords(res.keywords);
      setKeywordInput("");
      // refresh articles after keyword change
      await refresh();
    } catch (err: any) {
      setError(err.message || "Failed to add keyword");
    }
  }

  async function remove(k: string) {
    setError(null);
    try {
      const res = await api.deleteKeyword(k);
      setKeywords(res.keywords);
      await refresh();
    } catch (err: any) {
      setError(err.message || "Failed to delete keyword");
    }
  }

  const hasKeywords = useMemo(() => keywords.length > 0, [keywords]);

  return (
    <AppShell>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Keywords */}
        <div className="lg:col-span-4">
          <div className="rounded-lg border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Keywords</h2>
            <p className="mt-1 text-sm text-gray-600">
              Add keywords to filter articles from NewsAPI.
            </p>

            <div className="mt-4 flex gap-2">
              <input
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder='e.g. "ukraine", "election"'
                className="w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
              <button
                onClick={addKeyword}
                className="rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
              >
                Add
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {keywords.length === 0 ? (
                <div className="rounded border border-dashed p-3 text-sm text-gray-600">
                  No keywords yet. Add one to start fetching articles.
                </div>
              ) : (
                keywords.map((k) => (
                  <div
                    key={k}
                    className="flex items-center justify-between rounded border px-3 py-2 text-gray-900"
                  >
                    <span className="text-sm">{k}</span>
                    <button
                      onClick={() => remove(k)}
                      className="text-sm text-white underline"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded bg-red-100 p-3 text-sm text-red-900">
              {error}
            </div>
          )}
        </div>

        {/* Right: Articles */}
        <div className="lg:col-span-8">
          <div className="rounded-lg border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Articles</h2>
              <button
                onClick={refresh}
                className="rounded border px-3 py-1 text-sm hover:bg-gray-50"
              >
                Refresh
              </button>
            </div>

            {!hasKeywords && (
              <div className="mt-4 rounded border border-dashed p-4 text-sm text-gray-600">
                Add keywords to see articles here.
              </div>
            )}

            {loading && (
              <div className="mt-4 text-sm text-gray-600">Loading…</div>
            )}

            {!loading && hasKeywords && articles.length === 0 && (
              <div className="mt-4 text-sm text-gray-600">
                No articles found for your keywords.
              </div>
            )}

            <div className="mt-4 space-y-3">
              {articles.map((a) => (
                <div>
                  <Link
                    to={`/articles/${a.id}`}
                    key={a.id}
                    className="block rounded-lg border p-4 hover:bg-gray-50"
                  >
                    <div className="text-sm text-gray-500">
                      {a.sourceName} • {new Date(a.publishedAt).toLocaleString()}
                    </div>
                    <div className="mt-1 font-semibold">{a.title}</div>
                    {a.description && (
                      <div className="mt-1 line-clamp-2 text-sm text-gray-700">
                        {a.description}
                      </div>
                    )}                  
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
