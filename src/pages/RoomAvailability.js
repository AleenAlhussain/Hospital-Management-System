import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRoomAvailability,
  updateRoomAvailability,
  deleteRoomAvailability,
} from "../redux/roomAvailabilitySlice";
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

const RoomAvailabilityManagement = () => {
  const dispatch = useDispatch();
  const roomAvailabilityRecords = useSelector(
    (state) => state.roomAvailability.roomAvailabilityRecords
  );
  const rooms = useSelector((state) => state.room.rooms);

  const [roomId, setRoomId] = useState("");
  const [dateChecked, setDateChecked] = useState("");
  const [available, setAvailable] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setRoomId("");
    setDateChecked("");
    setAvailable("");
  };

  const handleEditRecord = (record) => {
    setEditingRecord(record);
    setRoomId(record.roomId);
    setDateChecked(record.dateChecked);
    setAvailable(record.available);
    setOpenDialog(true);
  };

  const handleAddRoomAvailability = () => {
    if (roomId && dateChecked && available) {
      const newRecord = {
        id: Date.now(),
        roomId,
        dateChecked,
        available,
      };
      dispatch(addRoomAvailability(newRecord));
      handleCloseDialog();
    }
  };

  const handleUpdateRoomAvailability = () => {
    if (editingRecord) {
      const updatedRecord = {
        id: editingRecord.id,
        roomId,
        dateChecked,
        available,
      };
      dispatch(updateRoomAvailability(updatedRecord));
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
        Add Room Availability
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Room</TableCell>
              <TableCell>Date Checked</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomAvailabilityRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  {rooms.find((room) => room.id === record.roomId)?.name || "N/A"}
                </TableCell>
                <TableCell>{record.dateChecked}</TableCell>
                <TableCell>{record.available ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => handleEditRecord(record)}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => dispatch(deleteRoomAvailability(record.id))}
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
          {editingRecord ? "Edit Room Availability" : "Add Room Availability"}
        </DialogTitle>
        <DialogContent>
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
            label="Date Checked"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={dateChecked}
            onChange={(e) => setDateChecked(e.target.value)}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Available</InputLabel>
            <Select
              value={available}
              onChange={(e) => setAvailable(e.target.value === "Yes")}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "#469E82" }}>
            Cancel
          </Button>
          <Button
            onClick={
              editingRecord ? handleUpdateRoomAvailability : handleAddRoomAvailability
            }
            sx={{ color: "#469E82" }}
          >
            {editingRecord ? "Update Room Availability" : "Add Room Availability"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoomAvailabilityManagement;
