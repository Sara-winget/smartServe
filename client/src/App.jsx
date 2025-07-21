import { useState } from 'react'
import { AuthProvider,useAuth } from './context/AuthContext';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import { Home,Login,SignUp,Proffesion,UserDashboard } from './Routes';
import ProtectedRoute from './components/common/ProtectedRoute';

import { useEffect } from 'react';


function AppContent() {
  const { loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profession/:professionName" element={<Proffesion />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <UserDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
}


function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;

