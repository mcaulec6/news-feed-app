import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearToken } from "../lib/api";

export function AppShell({ children }: { children: ReactNode }) {
  const nav = useNavigate();

  function logout() {
    clearToken();
    nav("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-6 py-4">
          <Link to="/articles" className="text-lg font-semibold">
            News Feed
          </Link>
          <button onClick={logout} className="rounded border px-3 py-1 text-sm">
            Logout
          </button>
        </div>
      </div>

      <main className="mx-auto w-full max-w-screen-2xl px-6 py-6">{children}</main>
    </div>
  );
}
