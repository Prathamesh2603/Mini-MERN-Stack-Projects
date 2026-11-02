import { useState } from "react"
import { useAuth } from "../context/AuthProvider"
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [submittting, setSubmitting] = useState(false);

  const handleLogout = async () => {
    setError("");
    setSubmitting(true);

    try {
      await logout();
      navigate("/login", { replace: true })
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const stats = [
    {
      title: "Account Status",
      value: "Active",
      icon: "✅"
    },
    {
      title: "Account Role",
      value: user?.role || "User",
      icon: "♟️"
    },
    {
      title: "Authentication",
      value: "Secure",
      icon: "🔒"
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <Navbar title="Dashboard" />

          <main className="p-6 md:p-8">

            {/* Welcome Section */}
            <section className="mb-8 rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 p-8 text-white shadow-lg">
              <p className="mb-2 text-sm text-indigo-100">
                Welcome back!
              </p>

              <h1 className="text-3xl font-bold">
                Hello, {user.name} 👋
              </h1>

              <p className="mt-3 text-sm text-indigo-100">
                Here's an overview of your account.
              </p>
            </section>

            {/* Statistic */}
            <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map(stat => (
                <div
                  key={stat.title}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex h11 w11 items-center justify-center rounded-lg bg-indigo-100 text-xl text-indigo-600">
                    {stat.icon}
                  </div>

                  <p className="text-sm text-slate-500">
                    {stat.title}
                  </p>

                  <h3 className="mt-1 text-2xl font-bold capitalize text-slate-800">
                    {stat.value}
                  </h3>
                </div>
              ))}
            </section>

            {/* Account Information */}
            <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-slate-800">
                Account Information
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                
                <div>
                  <p className="text-sm text-slate-500">
                    Full Name
                  </p>

                  <p className="mt-1 font-medium text-slate-800">
                    {user?.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Email Address
                  </p>

                  <p className="mt-1 break-all font-medium text-slate-800">
                    {user?.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Account Role
                  </p>

                  <p className="mt-1 capitalize font-medium text-slate-800">
                    {user?.role}
                  </p>
                </div>

              </div>
            </section>

            {/* Logout */}
            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleLogout} disabled={submittting}
                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {submittting ? "Logging out..." : "Logout"}
              </button>
            </div>

            {error && (
              <p className="mt-4 text-sm text-red-600">{error}</p>
            )}

          </main>

        </div>
    </div>
  )
}

export default Dashboard