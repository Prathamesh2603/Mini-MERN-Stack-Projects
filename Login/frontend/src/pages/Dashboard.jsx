import { useState } from "react"
import { useAuth } from "../context/AuthProvider"
import { Link, useNavigate } from "react-router-dom";

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
  }

  return (
    <main>
      <h1>Dashboard</h1>

      <p>Welcome, {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

      {user.role === "admin" && (
        <Link to="/admin">Open admin dashboard</Link>
      )}

      {error && <p role="alert">{error}</p>}

      <button onClick={handleLogout} disabled={submittting}>
        {submittting ? "Logging out..." : "Logout"}
      </button>
    </main>
  )
}

export default Dashboard