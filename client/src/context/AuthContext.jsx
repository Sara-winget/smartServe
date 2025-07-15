// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const login = (token, user) => {
    setAccessToken(token);
    setCurrentUser(user);
  };

  const logout = () => {
    setAccessToken("");
    setCurrentUser(null);
  };

  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const res = await api.get("/auth/refresh");
        setAccessToken(res.data.accessToken);

        const profile = await api.get("/auth/profile");
        setCurrentUser(profile.data.user);
      } catch (err) {
        console.log("No valid refresh token. User needs to login.");
        setAccessToken("");
        setCurrentUser(null);
      }
    };

    tryRefresh();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
