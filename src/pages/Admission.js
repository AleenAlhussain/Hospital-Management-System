import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdmission,
  updateAdmission,
  deleteAdmission,
} from "../redux/admissionSlice";
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

const AdmissionManagement = () => {
  const dispatch = useDispatch();
  const admissions = useSelector((state) => state.admission.admissions);
  const patients = useSelector((state) => state.patients.patients);
  const rooms = useSelector((state) => state.room.rooms);

  const [patientId, setPatientId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [dateOfAdmission, setDateOfAdmission] = useState("");
  const [dateOfDischarge, setDateOfDischarge] = useState("");
  const [status, setStatus] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAdmission, setEditingAdmission] = useState(null);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setPatientId("");
    setRoomId("");
    setDateOfAdmission("");
    setDateOfDischarge("");
    setStatus("");
  };

  const handleEditAdmission = (admission) => {
    setEditingAdmission(admission);
    setPatientId(admission.patientId);
    setRoomId(admission.roomId);
    setDateOfAdmission(admission.dateOfAdmission);
    setDateOfDischarge(admission.dateOfDischarge);
    setStatus(admission.status);
    setOpenDialog(true);
  };

  const handleAddAdmission = () => {
    if (patientId && roomId && dateOfAdmission && status) {
      const newAdmission = {
        id: Date.now(),
        patientId,
        roomId,
        dateOfAdmission,
        dateOfDischarge,
        status,
      };
      dispatch(addAdmission(newAdmission));
      handleCloseDialog();
    }
  };

  const handleUpdateAdmission = () => {
    if (editingAdmission) {
      const updatedAdmission = {
        id: editingAdmission.id,
        patientId,
        roomId,
        dateOfAdmission,
        dateOfDischarge,
        status,
      };
      dispatch(updateAdmission(updatedAdmission));
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
        Add Admission
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Date of Admission</TableCell>
              <TableCell>Date of Discharge</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admissions.map((admission) => (
              <TableRow key={admission.id}>
                <TableCell>
                  {patients.find((pat) => pat.id === admission.patientId)
                    ?.firstName || "N/A"}
                </TableCell>
                <TableCell>
                  {rooms.find((room) => room.id === admission.roomId)?.name ||
                    "N/A"}
                </TableCell>
                <TableCell>{admission.dateOfAdmission}</TableCell>
                <TableCell>{admission.dateOfDischarge}</TableCell>
                <TableCell>{admission.status}</TableCell>
                <TableCell>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => handleEditAdmission(admission)}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => dispatch(deleteAdmission(admission.id))}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
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
          {editingAdmission ? "Edit Admission" : "Add Admission"}
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
            <InputLabel>Room</InputLabel>
            <Select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
              {rooms.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  {room.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Date of Admission"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={dateOfAdmission}
            onChange={(e) => setDateOfAdmission(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Date of Discharge"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={dateOfDischarge}
            onChange={(e) => setDateOfDischarge(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Status"
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "#469E82" }}>
            Cancel
          </Button>
          <Button
            onClick={
              editingAdmission ? handleUpdateAdmission : handleAddAdmission
            }
            sx={{ color: "#469E82" }}
          >
            {editingAdmission ? "Update Admission" : "Add Admission"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdmissionManagement;
