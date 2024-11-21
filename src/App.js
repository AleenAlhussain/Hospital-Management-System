import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./pages/Layout";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Register from "./components/Register";
import Department from "./pages/Department";
import Room from "./pages/Room";
import Doctor from "./pages/Doctor";
import Service from './pages/Service';
import Patient from './pages/Patient';
import Nurse from "./pages/Nurse";
import MedicalRecord from "./pages/MedicalRecord";
import Receptionist from "./pages/Receptionist";
import PatientService from "./pages/PatientService";
import SurgicalOperation from "./pages/SurgicalOperation";
import Shift from "./pages/ShiftManagement";
import Staff from "./pages/StaffSchedule";
import RoomAvailability from "./pages/RoomAvailability";
import Admission from "./pages/Admission";
import Appointment from "./pages/Appointment";
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
                  <Route path="/nurses" element={<Nurse />} />
                  <Route path="/medical_record" element={<MedicalRecord />} />
                  <Route path="/receptionist" element={<Receptionist />} />
                  <Route path="/surgical_operation" element={<SurgicalOperation />} />
                  <Route path="/patient_service" element={<PatientService />} />
                  <Route path="/shift" element={<Shift />} />
                  <Route path="/admission" element={<Admission />} />
                  <Route path="/staff" element={<Staff />} />
                  <Route path="/room_availability" element={<RoomAvailability />} />
                  <Route path="/appointment" element={<Appointment/>} />
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
