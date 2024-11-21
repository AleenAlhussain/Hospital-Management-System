import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSurgicalOperation,
  updateSurgicalOperation,
  deleteSurgicalOperation,
} from "../redux/surgicalOperationSlice";
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

const SurgicalOperationManagement = () => {
  const dispatch = useDispatch();
  const surgicalOperations = useSelector((state) => state.surgicalOperation.surgicalOperations);
  const patients = useSelector((state) => state.patients.patients);
  const rooms = useSelector((state) => state.room.rooms);

  const [patientId, setPatientId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("");
  const [time, setTime] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingOperation, setEditingOperation] = useState(null);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setPatientId("");
    setRoomId("");
    setScheduledDate("");
    setDetails("");
    setStatus("");
    setTime("");
  };

  const handleEditOperation = (operation) => {
    setEditingOperation(operation);
    setPatientId(operation.patientId);
    setRoomId(operation.roomId);
    setScheduledDate(operation.scheduledDate);
    setDetails(operation.details);
    setStatus(operation.status);
    setTime(operation.time);
    setOpenDialog(true);
  };

  const handleAddSurgicalOperation = () => {
    if (patientId && roomId && scheduledDate && details && status && time) {
      const newOperation = {
        id: Date.now(),
        patientId,
        roomId,
        scheduledDate,
        details,
        status,
        time,
      };
      dispatch(addSurgicalOperation(newOperation));
      handleCloseDialog();
    }
  };

  const handleUpdateSurgicalOperation = () => {
    if (editingOperation) {
      const updatedOperation = {
        id: editingOperation.id,
        patientId,
        roomId,
        scheduledDate,
        details,
        status,
        time,
      };
      dispatch(updateSurgicalOperation(updatedOperation));
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
        Add Surgical Operation
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Scheduled Date</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {surgicalOperations.map((operation) => (
              <TableRow key={operation.id}>
                <TableCell>
                  {patients.find((pat) => pat.id === operation.patientId)?.firstName || "N/A"}
                </TableCell>
                <TableCell>
                  {rooms.find((room) => room.id === operation.roomId)?.name || "N/A"}
                </TableCell>
                <TableCell>{operation.scheduledDate}</TableCell>
                <TableCell>{operation.details}</TableCell>
                <TableCell>{operation.status}</TableCell>
                <TableCell>{operation.time}</TableCell>
                <TableCell>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => handleEditOperation(operation)}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => dispatch(deleteSurgicalOperation(operation.id))}
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
          {editingOperation ? "Edit Surgical Operation" : "Add Surgical Operation"}
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
            <Select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            >
              {rooms.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  {room.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Scheduled Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Details"
            fullWidth
            value={details}
            onChange={(e) => setDetails(e.target.value)}
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
            label="Time"
            type="time"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={time}
            onChange={(e) => setTime(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "#469E82" }}>
            Cancel
          </Button>
          <Button
            onClick={editingOperation ? handleUpdateSurgicalOperation : handleAddSurgicalOperation}
            sx={{ color: "#469E82" }}
          >
            {editingOperation ? "Update Surgical Operation" : "Add Surgical Operation"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SurgicalOperationManagement;
