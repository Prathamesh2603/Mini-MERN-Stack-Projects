import { useEffect, useState } from "react"
import { api } from "../api/api";

const AdminDashboard = () => {
  const [message, setMessage] = useState("Loading admin data...");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    api.adminDashboard().then(data => {
      if (active) setMessage(data.message);
    }).catch(err => {
      if (active) setMessage(err.message);
    });

    return () => {
      active = false;
    }
  }, []);

  return (
    <main>
      <h1>Admin Dashboard</h1>
      {error ? <p role="alert">{error}</p> : <p>{message}</p>}
    </main>
  )
}

export default AdminDashboard