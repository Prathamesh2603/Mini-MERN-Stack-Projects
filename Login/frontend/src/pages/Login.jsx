import { useState } from "react";
import { useAuth } from "../context/AuthProvider"
import { Link, Navigate, replace, useNavigate } from "react-router-dom";
import BrandingSection from "../components/BrandingSection";

const Login = () => {
  const {login, loading, user} = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (loading) {
    return <p>Checking your session...</p>
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(email, password);
      navigate ("/dashboard", {replace: true})
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">

      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">

        {/* Branding Section */}
        <BrandingSection 
          icon="🔐" 
          heading="Welcome back to your workspace."
          para="Sign in securely and continue managing your account
          with confidence."
        />

        {/* Login form */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">

            <div className="mb-8 md:hidden">
              <h1 className="text-2xl font-bold text-slate-900">
                MERN<span className="text-indigo-600">Auth</span>
              </h1>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold text-indigo-600">
                WELCOME BACK
              </p>

              <h2 className="text-3xl font-bold text-slate-900">
                Sign in to your account
              </h2>
              
              <p className="mt-2 text-sm text-slate-500">
                Enter your credentials to access your dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label 
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email
                </label>
                <input 
                  id="email"
                  type="email"
                  placeholder="Enter emial..."
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label 
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
                <input 
                  id="password"
                  type="password" 
                  placeholder="Enter password..."
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {error && (
                <p 
                  role="alert"
                  className="rounded-lg bg-red-50 text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {submitting ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
                Create account
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login