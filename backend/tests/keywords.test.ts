import request from "supertest";
import type { Express } from "express";

process.env.JWT_SECRET = "test_jwt_secret";
process.env.NEWS_API_KEY = "test_key";
process.env.NEWS_API_BASE_URL = "https://newsapi.org/v2";

let app: Express;

beforeAll(async () => {
  const mod = await import("../src/index");
  app = (mod as any).app || (mod as any).default || (mod as any);
});

async function getToken(email: string, password: string) {
  await request(app).post("/auth/register").send({ email, password });
  const login = await request(app).post("/auth/login").send({ email, password });
  return login.body.token as string;
}

describe("keyword persistence", () => {
  it("adds, lists, and deletes keywords for the authenticated user", async () => {
    const token = await getToken("kw@test.com", "password");

    const add = await request(app)
      .post("/keywords")
      .set("Authorization", `Bearer ${token}`)
      .send({ keyword: "ukraine" });

    expect([200, 201]).toContain(add.status);
    expect(add.body.keywords).toContain("ukraine");

    const list = await request(app)
      .get("/keywords")
      .set("Authorization", `Bearer ${token}`);

    expect(list.status).toBe(200);
    expect(list.body.keywords).toContain("ukraine");

    const del = await request(app)
      .delete("/keywords/ukraine")
      .set("Authorization", `Bearer ${token}`);

    expect(del.status).toBe(200);
    expect(del.body.keywords).not.toContain("ukraine");
  });
});
