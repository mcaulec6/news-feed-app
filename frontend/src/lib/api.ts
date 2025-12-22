const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
import type { Article } from "../types";

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function setToken(token: string) {
  localStorage.setItem("token", token);
}

export function clearToken() {
  localStorage.removeItem("token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  register: (email: string, password: string) =>
    request<{ id: string; email: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  login: (email: string, password: string) =>
    request<{ token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  getKeywords: () => request<{ keywords: string[] }>("/keywords"),
  addKeyword: (keyword: string) =>
    request<{ keywords: string[] }>("/keywords", {
      method: "POST",
      body: JSON.stringify({ keyword }),
    }),
  deleteKeyword: (keyword: string) =>
    request<{ keywords: string[] }>(`/keywords/${encodeURIComponent(keyword)}`, {
      method: "DELETE",
    }),

  getArticles: () =>
    request<{ keywords: string[]; articles: Article[] }>("/articles"),
};
