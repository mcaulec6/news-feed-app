import { Link, useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../lib/api";

export function Header() {
  const nav = useNavigate();
  const token = getToken();

  function logout() {
    clearToken();
    nav("/login");
  }

  return (
    <div className="mb-6 flex items-center justify-between">
      <Link to="/articles" className="text-lg font-semibold">
        News Feed
      </Link>

      {token ? (
        <button onClick={logout} className="rounded border px-3 py-1 text-sm">
          Logout
        </button>
      ) : (
        <Link to="/login" className="text-sm underline">
          Login
        </Link>
      )}
    </div>
  );
}
