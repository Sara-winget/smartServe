// src/components/common/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { accessToken } = useAuth();

  if (accessToken === null) {
    // Still loading (refresh in progress)
    return <div>Loading...</div>;
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
