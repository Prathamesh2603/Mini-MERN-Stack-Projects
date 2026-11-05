import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import BrandingSection from "../components/BrandingSection";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await register(name, email, password);
      navigate("/login", {state: {message: "Account created successfully! Please login"}}, {replace: true});
    } catch (error) {
      setError(error.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">

      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">

        {/* Branding Section */}
        <BrandingSection 
          icon="🚀" 
          heading="Start your journey with us."
          para="Create your account and get access to a secure, personalized workspace."
        />

        {/* Registration form */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            
            <div className="mb-8 md:hidden">
              <h1 className="text-2xl font-bold text-slate-900">
                MERN<span className="text-indigo-600">Auth</span>
              </h1>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold text-indigo-600">
                GET STARTED
              </p>

              <h2 className="text-3xl font-bold text-slate-900">
                Create your account
              </h2>
              
              <p className="mt-2 text-sm text-slate-500">
                Fill in your details to get started.
              </p>
            </div>

            <form 
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label 
                  className="mb-2 block text-sm font-semibold text-slate-700"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  required
                  minLength={2}
                  maxLength={60}
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label 
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>
                <input 
                  type="email" 
                  name="email" 
                  id="email"
                  autoComplete="email"
                  required 
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
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
                  type="password" 
                  name="password" 
                  id="password" 
                  required
                  minLength={8}
                  maxLength={72}
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
                <p className="mt-2 text-xs text-slate-400"> 
                  Use atleast 8 characters.
                </p>
              </div>

              {error && (
                <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account? 
              <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
                Login
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Register