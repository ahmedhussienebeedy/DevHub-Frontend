import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const API =
  import.meta.env.VITE_API_URL ||
  "https://devhub-backend-production-113b.up.railway.app/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async (jwtToken) => {
    try {
      const { data } = await axios.get(`${API}/users/me`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      setUser(data.user);

      return data.user;
    } catch (error) {
      console.error(error);

      localStorage.clear();

      setToken(null);
      setUser(null);

      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
      getCurrentUser(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (data) => {
    localStorage.setItem("token", data.token);

    setToken(data.token);

    return await getCurrentUser(data.token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
