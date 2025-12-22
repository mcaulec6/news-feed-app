import nock from "nock";
import { fetchArticlesForKeywords } from "../src/services/newsService";

describe("newsService", () => {
  it("returns [] when no keywords", async () => {
    const res = await fetchArticlesForKeywords([]);
    expect(res).toEqual([]);
  });

  it("gets articles from NewsAPI", async () => {
    const base = process.env.NEWS_API_URL || 'https://newsapi.org/v2';

    nock(base)
      .get("/everything")
      .query(true)
      .reply(200, {
        articles: [
          {
            title: "Test title",
            author: "Author",
            description: "Desc",
            url: "https://example.com/a",
            urlToImage: null,
            publishedAt: "2025-12-22T00:00:00Z",
            source: { name: "Example" },
          },
        ],
      });

    const res = await fetchArticlesForKeywords(["test"]);
    expect(res).toHaveLength(1);
    expect(res[0].title).toBe("Test title");
    expect(res[0].sourceName).toBe("Example");
    expect(res[0].url).toBe("https://example.com/a");
    expect(res[0].id).toBeTruthy();
  });
});
