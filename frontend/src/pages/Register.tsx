import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { AuthLayout } from "../components/AuthLayout";

export function Register() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.register(email, password);
      nav("/login");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
  <AuthLayout>
    <h1 className="mb-6 text-2xl font-semibold">Create account</h1>

    {error && <div className="mb-3 rounded bg-red-100 p-2 text-sm">{error}</div>}

    <form onSubmit={onSubmit} className="space-y-3">
      <input
        className="w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        disabled={loading}
        className="w-full rounded-lg bg-black px-3 py-2 text-white hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Register"}
      </button>
    </form>

    <p className="mt-4 text-sm">
      Already have an account?{" "}
      <Link className="underline" to="/login">
        Sign in
      </Link>
    </p>
  </AuthLayout>
);

}
