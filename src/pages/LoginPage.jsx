import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate("/dashboard");
  };

  return (
    <div className="app-shell flex items-center justify-center px-4 py-8">
      <div className="surface w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Bienvenue
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Connexion
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Accédez à votre tableau de bord en quelques secondes.
          </p>
        </div>

        {error ? (
          <p className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
