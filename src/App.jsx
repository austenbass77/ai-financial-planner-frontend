import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import MyInfo from "./pages/MyInfo";
import ChatAssistant from "./components/ChatAssistant";
import NavBar from "./components/NavBar";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <>
      <Router>
        {isAuthenticated && <NavBar logout={logout} />}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login login={login} />} />
          {isAuthenticated ? (
            <>
              <Route path="/welcome" element={<Welcome logout={logout} />} />
              <Route path="/my-info" element={<MyInfo />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Router>
      {isAuthenticated && <ChatAssistant />}
    </>
  );
};

export default App;
