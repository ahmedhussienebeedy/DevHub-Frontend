import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function ProtectedRoute() {
  const { token, loading } = useAuth();

  console.log("ProtectedRoute =>", {
    token,
    loading,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    );
  }

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}