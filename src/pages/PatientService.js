import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPatientService,
  updatePatientService,
  deletePatientService,
} from "../redux/patientServiceSlice";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const PatientServiceManagement = () => {
  const dispatch = useDispatch();

  const patientServices = useSelector(
    (state) => state.patientService.patientServices
  );
  const patients = useSelector((state) => state.patients.patients);
  const services = useSelector((state) => state.services.services);

  const [patientId, setPatientId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [result, setResult] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setPatientId("");
    setServiceId("");
    setTime("");
    setDate("");
    setStatus("");
    setResult("");
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setPatientId(service.patientId);
    setServiceId(service.serviceId);
    setTime(service.time);
    setDate(service.date);
    setStatus(service.status);
    setResult(service.result);
    setOpenDialog(true);
  };

  const handleAddPatientService = () => {
    if (patientId && serviceId && time && date && status && result) {
      const newService = {
        id: Date.now(),
        patient_id: patientId,
        service_id: serviceId,
        time,
        date,
        status,
        result,
      };
      dispatch(addPatientService(newService));
      handleCloseDialog();
    }
  };

  const handleUpdatePatientService = () => {
    if (editingService) {
      const updatedService = {
        id: editingService.id,
        patient_id: patientId,
        service_id: serviceId,
        time,
        date,
        status,
        result,
      };
      dispatch(updatePatientService(updatedService));
      handleCloseDialog();
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        sx={{ backgroundColor: "#469E82", marginBottom: 2 }}
      >
        Add Patient Service
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Result</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientServices.map((service) => {
              const patient = patients.find(
                (pat) => pat.id === service.patient_id
              );
              const serviceItem = services.find(
                (srv) => srv.id === service.service_id
              );
              const isUnknownService = !serviceItem;

              return (
                <TableRow key={service.id}>
                  <TableCell>
                    {patient
                      ? `${patient.firstName} ${patient.lastName}`
                      : "Unknown Patient"}
                  </TableCell>
                  <TableCell>
                    {isUnknownService ? "Unknown Service" : serviceItem.name}
                  </TableCell>
                  <TableCell>{service.time}</TableCell>
                  <TableCell>{service.date}</TableCell>
                  <TableCell>{service.status}</TableCell>
                  <TableCell>{service.result}</TableCell>
                  <TableCell>
                    <Button
                      sx={{ color: "#469E82" }}
                      onClick={() => handleEditService(service)}
                    >
                      Edit
                    </Button>
                    <Button
                      sx={{ color: "#469E82" }}
                      onClick={() => dispatch(deletePatientService(service.id))}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingService ? "Edit Patient Service" : "Add Patient Service"}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Patient</InputLabel>
            <Select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            >
              {patients.map((patient) => (
                <MenuItem key={patient.id} value={patient.id}>
                  {patient.firstName} {patient.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Service</InputLabel>
            <Select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
            >
              {services.map((service) => (
                <MenuItem key={service.id} value={service.id}>
                  {service.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Time"
            type="time"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={time}
            onChange={(e) => setTime(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Status"
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Result"
            fullWidth
            value={result}
            onChange={(e) => setResult(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "#469E82" }}>
            Cancel
          </Button>
          <Button
            onClick={
              editingService
                ? handleUpdatePatientService
                : handleAddPatientService
            }
            sx={{ color: "#469E82" }}
          >
            {editingService ? "Update Patient Service" : "Add Patient Service"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PatientServiceManagement;
