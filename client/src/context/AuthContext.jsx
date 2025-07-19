import { createContext, useContext, useState, useEffect } from "react";
import api, { setAccessToken } from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (token, user) => {
    setAccessToken(token);
    setCurrentUser(user);
  };

  const logout = () => {
    setAccessToken(null);
    setCurrentUser(null);
  };

 useEffect(() => {
  const tryRefresh = async () => {
    try {
      const res = await api.get("/auth/refresh");
      setAccessToken(res.data.accessToken);
      const profile = await api.get("/auth/profile");
      setCurrentUser(profile.data.user);
    } catch {
      console.log("No valid refresh token. Staying logged out.");
    } finally {
      setLoading(false);
    }
  };

  tryRefresh();
}, []);


  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
