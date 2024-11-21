import React, { useState } from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Register from "./components/Register";
import Department from "./pages/Department";
import Room from "./pages/Room";
import Doctor from "./pages/Doctor";
import Service from './pages/Service';
import Patient from './pages/Patient';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleDrawerOpen = () => {
    setSidebarOpen(true);
  };

  const handleDrawerClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {!isAuthenticated ? (
          <Route path="*" element={<Navigate to="/login" />} />
        ) : (
          <Route
            path="*"
            element={
              <Layout
                sidebarOpen={sidebarOpen}
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
              >
                <Routes>
                  <Route path="/departments" element={<Department />} />
                  <Route path="/rooms" element={<Room />} />
                  <Route path="/doctors" element={<Doctor />} />
                  <Route path="/services" element={<Service />} />
                  <Route path="/patients" element={<Patient />} />
                </Routes>
              </Layout>
            }
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;
