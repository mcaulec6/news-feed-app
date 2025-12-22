import { Navigate } from "react-router-dom";
import { getToken } from "../lib/api";
import type { JSX } from "react/jsx-dev-runtime";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}
    