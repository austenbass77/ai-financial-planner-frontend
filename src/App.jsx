// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import Family from './pages/Family';
import NavBar from './components/NavBar';

function RequireAuth({ children, isAuthenticated }) {
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {isAuthenticated && <NavBar logout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/welcome" : "/login"} />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/welcome" /> : <Login onLogin={handleLogin} />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/welcome" /> : <Register />} />
        <Route
          path="/welcome"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <Welcome />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/family"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <Family />
            </RequireAuth>
          }
        />        
        <Route path="*" element={<Navigate to={isAuthenticated ? "/welcome" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;