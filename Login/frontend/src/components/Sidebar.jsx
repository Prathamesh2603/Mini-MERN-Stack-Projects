import { useAuth } from "../context/AuthProvider";
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const { user } = useAuth();

  const linkClass = ({isActive}) => `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
    isActive
      ? "bg-indigo-600 text-white"
      : "text-slate-300 hover:bg-slate-800 hover:text-white"
  }`;

  return (
    <aside className="min-h-screen hidden w-64 flex-col bg-slate-950 p-5
     text-white md:flex">
      <h1 className="mb-10 text-2xl font-bold tracking-tight">
        MERN<span className="text-indigo-400">Panel</span>
      </h1>
      <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Main Menu
      </p>

      <nav className="space-y-2">
        <NavLink to="/dashboard" className={linkClass}>
          <span>▦</span>Dashboard
        </NavLink>

        {user?.role === "admin" && (
          <NavLink to="/admin" className={linkClass}>
            <span>⚙</span> Admin Dashboard
          </NavLink>
        )}
      </nav>

      <div className="mt-auto border-t border-slate-800 pt-5">
        <p className="truncate px-3 text-sm font-medium">
          {user?.name}
        </p>

        <p className="truncate px-3 pt-1 text-xs text-slate-400">
          {user?.email}
        </p>
      </div>
    </aside>
  )
}

export default Sidebar