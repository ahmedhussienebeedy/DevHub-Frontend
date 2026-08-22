import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function GuestRoute() {
  const { token, user, loading } = useAuth();

  if (loading) return null;

  if (token && user) {
    if (user.role === "client") {
      return <Navigate to="/client" replace />;
    }

    if (user.role === "freelancer") {
      return <Navigate to="/freelancer" replace />;
    }
  }

  return <Outlet />;
}