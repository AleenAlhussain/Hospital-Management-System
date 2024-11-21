import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPatient,
  updatePatient,
  removePatient,
} from "../redux/patientSlice";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const PatientManagement = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const rooms = useSelector((state) => state.room.rooms);
  const doctors = useSelector((state) => state.doctor.doctors);
  const services = useSelector((state) => state.services.services);

  const [patientName, setPatientName] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const handleAddPatient = () => {
    if (
      patientName &&
      selectedRoomId &&
      selectedDoctorId &&
      selectedServiceId
    ) {
      const newPatient = {
        id: Date.now(),
        name: patientName,
        roomId: selectedRoomId,
        doctorId: selectedDoctorId,
        serviceId: selectedServiceId,
        date: new Date().toISOString().split("T")[0],
      };

      dispatch(addPatient(newPatient));
      resetForm();
    }
  };

  const handleUpdatePatient = () => {
    if (editingPatient) {
      const updatedPatient = {
        id: editingPatient.id,
        name: patientName,
        roomId: selectedRoomId,
        doctorId: selectedDoctorId,
        serviceId: selectedServiceId,
        date: editingPatient.date,
      };
      dispatch(updatePatient(updatedPatient));
      resetForm();
    }
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setPatientName(patient.name);
    setSelectedRoomId(patient.roomId);
    setSelectedDoctorId(patient.doctorId);
    setSelectedServiceId(patient.serviceId);
    setOpenDialog(true);
  };

  const resetForm = () => {
    setPatientName("");
    setSelectedRoomId("");
    setSelectedDoctorId("");
    setSelectedServiceId("");
    setEditingPatient(null);
  };

  const handleCloseDialog = () => {
    resetForm();
    setOpenDialog(false);
  };

  useEffect(() => {
    setFilteredPatients(patients);
  }, [patients]);

  const handleFilterPatients = () => {
    const start = startDate
      ? new Date(startDate).toISOString().split("T")[0]
      : null;
    const end = endDate ? new Date(endDate).toISOString().split("T")[0] : null;

    const filtered = patients.filter((patient) => {
      const patientDate = patient.date;

      if (start && end) {
        return patientDate >= start && patientDate <= end;
      } else if (start) {
        return patientDate >= start;
      } else if (end) {
        return patientDate <= end;
      }
      return true;
    });

    setFilteredPatients(filtered);
  };

  const handleResetFilter = () => {
    setFilteredPatients(patients);
    setStartDate("");
    setEndDate("");
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        sx={{ backgroundColor: "#469E82" }}
        onClick={() => setOpenDialog(true)}
      >
        Add Patient
      </Button>
      <div style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}>
        <TextField
          type="date"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          type="date"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: "#469E82" }}
          onClick={handleFilterPatients}
        >
          Filter
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#469E82" }}
          onClick={handleResetFilter}
        >
          Reset Filter
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>
                  {rooms.find((room) => room.id === patient.roomId)?.number ||
                    "N/A"}
                </TableCell>
                <TableCell>
                  {doctors.find((doctor) => doctor.id === patient.doctorId)
                    ?.name || "N/A"}
                </TableCell>
                <TableCell>
                  {services.find((service) => service.id === patient.serviceId)
                    ?.name || "N/A"}
                </TableCell>
                <TableCell>
                  {new Date(patient.date).toLocaleDateString() || "N/A"}
                </TableCell>
                <TableCell>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => handleEditPatient(patient)}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => dispatch(removePatient(patient.id))}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>
          {editingPatient ? "Edit Patient" : "Add Patient"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Room</InputLabel>
            <Select
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
            >
              {rooms.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  {room.number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Doctor</InputLabel>
            <Select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
            >
              {doctors.map((doctor) => (
                <MenuItem key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Service</InputLabel>
            <Select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
            >
              {services && services.length > 0 ? (
                services.map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    {service.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">No services available</MenuItem>
              )}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={editingPatient ? handleUpdatePatient : handleAddPatient}
            color="primary"
          >
            {editingPatient ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PatientManagement;
