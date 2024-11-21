import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShift, updateShift, deleteShift } from "../redux/shiftSlice";
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
} from "@mui/material";

const ShiftManagement = () => {
  const dispatch = useDispatch();
  const shifts = useSelector((state) => state.shift.shifts);

  const [shiftType, setShiftType] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingShift, setEditingShift] = useState(null);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setShiftType("");
    setStartTime("");
    setEndTime("");
  };

  const handleEditShift = (shift) => {
    setEditingShift(shift);
    setShiftType(shift.type);
    setStartTime(shift.start_time);
    setEndTime(shift.end_time);
    setOpenDialog(true);
  };

  const handleAddShift = () => {
    if (shiftType && startTime && endTime) {
      const newShift = {
        id: Date.now(),
        type: shiftType,
        start_time: startTime,
        end_time: endTime,
      };
      dispatch(addShift(newShift));
      handleCloseDialog();
    }
  };

  const handleUpdateShift = () => {
    if (editingShift) {
      const updatedShift = {
        id: editingShift.id,
        type: shiftType,
        start_time: startTime,
        end_time: endTime,
      };
      dispatch(updateShift(updatedShift));
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
        Add Shift
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Shift Type</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shifts.map((shift) => (
              <TableRow key={shift.id}>
                <TableCell>{shift.type}</TableCell>
                <TableCell>{shift.start_time}</TableCell>
                <TableCell>{shift.end_time}</TableCell>
                <TableCell>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => handleEditShift(shift)}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => dispatch(deleteShift(shift.id))}
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
        <DialogTitle>{editingShift ? "Edit Shift" : "Add Shift"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Shift Type"
            fullWidth
            value={shiftType}
            onChange={(e) => setShiftType(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Start Time"
            type="time"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            margin="normal"
          />
          <TextField
            label="End Time"
            type="time"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "#469E82" }}>
            Cancel
          </Button>
          <Button
            onClick={editingShift ? handleUpdateShift : handleAddShift}
            sx={{ color: "#469E82" }}
          >
            {editingShift ? "Update Shift" : "Add Shift"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShiftManagement;
