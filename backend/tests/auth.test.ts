import request from "supertest";
import type { Express } from "express";

process.env.NEWS_API_KEY = "test-api-key";
process.env.NEWS_API_URL = "https://newsapi.org/v2";

let app: Express;

beforeAll(async () => {
  const mod = await import("../src/index");
  app = (mod as any).app || (mod as any).default || (mod as any);
});

describe("auth flow", () => {
  it("registers and logs in a user", async () => {
    const email = "auth@test.com";
    const password = "password";

    const reg = await request(app)
      .post("/auth/register")
      .send({ email, password });

    expect([200, 201]).toContain(reg.status);

    const login = await request(app)
      .post("/auth/login")
      .send({ email, password });

    expect(login.status).toBe(200);
    expect(login.body.token).toBeTruthy();
  });
});
