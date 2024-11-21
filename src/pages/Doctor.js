import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDoctor,
  updateDoctorSchedule,
  deleteDoctor,
} from "../redux/doctorSlice";
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

const DoctorManagement = () => {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctor.doctors);
  const departments = useSelector((state) => state.department.departments);
  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");

  const handleAddDoctor = () => {
    if (
      doctorName &&
      specialization &&
      scheduleDate &&
      scheduleTime &&
      selectedDepartmentId
    ) {
      const newDoctor = {
        id: Date.now(),
        name: doctorName,
        specialization,
        schedule: {
          date: scheduleDate,
          time: scheduleTime,
        },
        departmentId: selectedDepartmentId,
        date: new Date().toISOString().split("T")[0],
      };
      dispatch(addDoctor(newDoctor));
      resetForm();
      handleCloseDialog();
    }
  };

  const handleUpdateDoctor = () => {
    if (editingDoctor) {
      const updatedDoctor = {
        id: editingDoctor.id,
        name: doctorName,
        specialization,
        schedule: {
          date: scheduleDate,
          time: scheduleTime,
        },
        departmentId: selectedDepartmentId,
        date: editingDoctor.date,
      };
      dispatch(updateDoctorSchedule(updatedDoctor));
      resetForm();
      handleCloseDialog();
    }
  };

  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor);
    setDoctorName(doctor.name);
    setSpecialization(doctor.specialization);
    setScheduleDate(doctor.schedule.date);
    setScheduleTime(doctor.schedule.time);
    setSelectedDepartmentId(doctor.departmentId);
    setOpenDialog(true);
  };

  const resetForm = () => {
    setDoctorName("");
    setSpecialization("");
    setScheduleDate("");
    setScheduleTime("");
    setSelectedDepartmentId("");
    setEditingDoctor(null);
  };

  const handleCloseDialog = () => {
    resetForm();
    setOpenDialog(false);
  };

  useEffect(() => {
    setFilteredDoctors(doctors);
  }, [doctors]);

  const handleFilterDoctors = () => {
    const start = startDate
      ? new Date(startDate).toISOString().split("T")[0]
      : null;
    const end = endDate ? new Date(endDate).toISOString().split("T")[0] : null;

    const filtered = doctors.filter((doctor) => {
      const doctorDate = doctor.date;

      if (start && end) {
        return doctorDate >= start && doctorDate <= end;
      } else if (start) {
        return doctorDate >= start;
      } else if (end) {
        return doctorDate <= end;
      }
      return true;
    });

    setFilteredDoctors(filtered);
  };

  const handleResetFilter = () => {
    setFilteredDoctors(doctors);
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
        Add Doctor
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
          onClick={handleFilterDoctors}
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
              <TableCell>Doctor Name</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Schedule</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDoctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell>
                  {departments.find((dept) => dept.id === doctor.departmentId)
                    ?.departmentName || "N/A"}
                </TableCell>
                <TableCell>
                  {doctor.schedule &&
                    `${doctor.schedule.date} at ${doctor.schedule.time}`}
                </TableCell>
                <TableCell>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => handleEditDoctor(doctor)}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => dispatch(deleteDoctor(doctor.id))}
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
          {editingDoctor ? "Edit Doctor" : "Add Doctor"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Doctor Name"
            fullWidth
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Specialization"
            fullWidth
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            margin="normal"
          />
          <TextField
            type="date"
            label="Schedule Date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
            margin="normal"
          />
          <TextField
            type="time"
            label="Schedule Time"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            margin="normal"
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
            onClick={editingDoctor ? handleUpdateDoctor : handleAddDoctor}
            sx={{ color: "#469E82" }}
          >
            {editingDoctor ? "Update Doctor" : "Add Doctor"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DoctorManagement;
