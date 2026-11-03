
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import { useAuth } from "../context/AuthProvider";

function AdminDashboard() {
  const { user, logout } = useAuth();
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [data, setData] = useState({
    stats: {
      totalUsers: 0,
      totalAdmins: 0,
      regularUsers: 0,
    },
    users: [],
  });

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await api.adminDashboard(debouncedSearch);
        setData(result);
      } catch (err) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [debouncedSearch]);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
    } catch (err) {
      setError(err.message || "Logout failed");
      setLoggingOut(false);
    }
  };

  const stats = [
    {
      title: "Total Users",
      value: data.stats.totalUsers,
      icon: "👥",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Admin Accounts",
      value: data.stats.totalAdmins,
      icon: "🛡️",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Regular Users",
      value: data.stats.regularUsers,
      icon: "👤",
      color: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col bg-slate-950 text-white md:flex">

        <div className="border-b border-slate-800 px-6 py-6">
          <h1 className="text-2xl font-bold">
            MERN<span className="text-indigo-400">Panel</span>
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Administration
          </p>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-6">
          <Link
            to="/dashboard"
            className="block rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-800"
          >
            Dashboard
          </Link>

          <Link
            to="/admin"
            className="block rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white"
          >
            Admin Dashboard
          </Link>
        </nav>

        <div className="border-t border-slate-800 p-4">
          <p className="truncate text-sm font-medium">{user?.name}</p>
          <p className="truncate text-xs text-slate-400">{user?.email}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-h-screen md:ml-64">

        {/* Navbar */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-5 sm:px-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Admin Dashboard
            </h2>
            <p className="text-sm text-slate-500">
              Manage your application
            </p>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </header>

        <div className="p-5 sm:p-8">

          {/* Welcome */}
          <section className="mb-8 rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 p-6 text-white shadow-lg sm:p-8">
            <p className="text-sm text-indigo-100">
              Administration Panel
            </p>

            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              Welcome, {user?.name} 👋
            </h1>

            <p className="mt-3 text-sm text-indigo-100">
              Here's what's happening with your application.
            </p>
          </section>

          {/* Statistics */}
          <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${stat.color}`}>
                  {stat.icon}
                </div>

                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h3 className="mt-2 text-3xl font-bold text-slate-900">
                  {stat.value}
                </h3>
              </div>
            ))}
          </section>

          {/* User Management */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  User Management
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  View all registered accounts
                </p>
              </div>

              <input
                type="text"
                placeholder="Search name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:max-w-xs"
              />
            </div>

            {error && (
              <p className="m-6 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            {loading ? (
              <div className="p-10 text-center text-sm text-slate-500">
                Loading users...
              </div>
            ) : data.users.length === 0 ? (
              <div className="p-10 text-center text-sm text-slate-500">
                No users found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-162.5 text-left">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Name</th>
                      <th className="px-6 py-4 font-semibold">Email</th>
                      <th className="px-6 py-4 font-semibold">Role</th>
                      <th className="px-6 py-4 font-semibold">Joined</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {data.users.map((account) => (
                      <tr
                        key={account._id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                          {account.name}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-500">
                          {account.email}
                        </td>

                        <td className="px-6 py-4">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                            account.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-indigo-100 text-indigo-700"
                          }`}>
                            {account.role}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-500">
                          {new Date(account.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!loading && (
              <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-500">
                Showing {data.users.length} users
              </div>
            )}

          </section>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;