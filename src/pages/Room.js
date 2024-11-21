import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, updateRoom, removeRoom } from "../redux/roomSlice";

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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const RoomManagement = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.room.rooms);
  const departments = useSelector((state) => state.department.departments);
  const [roomType, setRoomType] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [roomSize, setRoomSize] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);

  const handleAddRoom = () => {
    if (
      roomType &&
      roomStatus &&
      roomSize &&
      roomNumber &&
      selectedDepartmentId
    ) {
      const newRoom = {
        id: Date.now(),
        type: roomType,
        status: roomStatus,
        size: roomSize,
        number: roomNumber,
        departmentId: selectedDepartmentId,
        date: new Date().toISOString().split("T")[0],
      };

      dispatch(addRoom(newRoom));
      resetForm();
    }
  };

  const handleUpdateRoom = () => {
    if (editingRoom) {
      const updatedRoom = {
        id: editingRoom.id,
        type: roomType,
        status: roomStatus,
        size: roomSize,
        number: roomNumber,
        departmentId: selectedDepartmentId,
        date: editingRoom.date,
      };
      dispatch(updateRoom(updatedRoom));
      resetForm();
    }
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setRoomType(room.type);
    setRoomStatus(room.status);
    setRoomSize(room.size);
    setRoomNumber(room.number);
    setSelectedDepartmentId(room.departmentId);
    setOpenDialog(true);
  };

  const resetForm = () => {
    setRoomType("");
    setRoomStatus("");
    setRoomSize("");
    setRoomNumber("");
    setSelectedDepartmentId("");
    setEditingRoom(null);
  };

  const handleCloseDialog = () => {
    resetForm();
    setOpenDialog(false);
  };

  useEffect(() => {
    setFilteredRooms(rooms);
  }, [rooms]);

  const handleFilterRooms = () => {
    const start = startDate
      ? new Date(startDate).toISOString().split("T")[0]
      : null;
    const end = endDate ? new Date(endDate).toISOString().split("T")[0] : null;

    const filtered = rooms.filter((room) => {
      const roomDate = room.date;

      if (start && end) {
        return roomDate >= start && roomDate <= end;
      } else if (start) {
        return roomDate >= start;
      } else if (end) {
        return roomDate <= end;
      }
      return true;
    });

    setFilteredRooms(filtered);
  };

  const handleResetFilter = () => {
    setFilteredRooms(rooms);
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
        Add Room
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
          onClick={handleFilterRooms}
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
              <TableCell>Room Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Room Number</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.type}</TableCell>
                <TableCell>{room.status}</TableCell>
                <TableCell>{room.size}</TableCell>
                <TableCell>{room.number}</TableCell>
                <TableCell>
                  {departments.find((dept) => dept.id === room.departmentId)
                    ?.departmentName || "N/A"}
                </TableCell>
                <TableCell>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => handleEditRoom(room)}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => dispatch(removeRoom(room.id))}
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
        <DialogTitle>{editingRoom ? "Edit Room" : "Add Room"}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Room Type</InputLabel>
            <Select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <MenuItem value="ICU">ICU</MenuItem>
              <MenuItem value="General">General</MenuItem>
              <MenuItem value="Surgical">Surgical</MenuItem>
              <MenuItem value="Private">Private</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Room Status</InputLabel>
            <Select
              value={roomStatus}
              onChange={(e) => setRoomStatus(e.target.value)}
            >
              <MenuItem value="Occupied">Occupied</MenuItem>
              <MenuItem value="Vacant">Vacant</MenuItem>
              <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Room Size</InputLabel>
            <Select
              value={roomSize}
              onChange={(e) => setRoomSize(e.target.value)}
            >
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Double">Double</MenuItem>
              <MenuItem value="Triple">Triple</MenuItem>
              <MenuItem value="Quadruple">Quadruple</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Room Number"
            margin="normal"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Department</InputLabel>
            <Select
              value={selectedDepartmentId}
              onChange={(e) => setSelectedDepartmentId(e.target.value)}
            >
              {departments.map((department) => (
                <MenuItem key={department.id} value={department.id}>
                  {department.departmentName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "#469E82" }}>
            Cancel
          </Button>
          <Button
            onClick={editingRoom ? handleUpdateRoom : handleAddRoom}
            sx={{ color: "#469E82" }}
          >
            {editingRoom ? "Update Room" : "Add Room"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoomManagement;
