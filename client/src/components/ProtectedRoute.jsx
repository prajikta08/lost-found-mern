import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get("/profile");
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <h3>Loading...</h3>;

  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;