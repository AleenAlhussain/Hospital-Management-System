import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNurse,
  updateNurse,
  deleteNurse,
} from "../redux/nurseSlice";
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
  Checkbox,
  ListItemText
} from "@mui/material";

import { selectNursesWithSchedules } from '../redux/selectNursesWithSchedules';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
const NurseManagement = () => {
  const dispatch = useDispatch();
  const nurses = useSelector((state) => state.nurse.nurses);
  const shifts = useSelector((state) => state.shift.shifts);
  const departments = useSelector((state) => state.department.departments);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingNurse, setEditingNurse] = useState(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [selectedShifts, setSelectedShifts] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const nursesWithSchedules = useSelector(selectNursesWithSchedules);
  const [openScheduleDialog, setOpenScheduleDialog] = useState(false);
  const [selectedNurseSchedules, setSelectedNurseSchedules] = useState([]);
  const [nurseName, setNurseName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [datesAndShifts, setDatesAndShifts] = useState([]);
  const handleAddNurse = () => {
    if (firstName) {
      const newNurse = {
        id: Date.now(),
        firstName,
      };
      dispatch(addNurse(newNurse));
      resetForm();
      handleCloseDialog();
    }
  };

  const handleUpdateNurse = () => {
    if (editingNurse) {
      const updatedNurse = {
        id: editingNurse.id,
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
      };
      dispatch(updateNurse(updatedNurse));
      resetForm();
      handleCloseDialog();
    }
  };

  const handleEditNurse = (nurse) => {
    setEditingNurse(nurse);
    setFirstName(nurse.firstName);
    setLastName(nurse.lastName);
    setEmail(nurse.email);
    setPhone(nurse.phone);
    setPassword(nurse.password);
    setGender(nurse.gender);
    setOpenDialog(true);
  };

  const resetForm = () => {
    setFirstName("");
  };

  const handleCloseDialog = () => {
    resetForm();
    setOpenDialog(false);
  };
  const handleDateChange = (date) => {
    if (Array.isArray(selectedDates)) {
      if (selectedDates.find(selectedDate => selectedDate.toDateString() === date.toDateString())) {
        setSelectedDates(prevDates => prevDates.filter(selectedDate => selectedDate.toDateString() !== date.toDateString()));
      } else {
        setSelectedDates(prevDates => [...prevDates, date]);
      }
    } else {
      setSelectedDates([date]);
    }
  };
  const handleAddDateShift = () => {
    if (selectedDates.length > 0 && selectedShifts.length > 0) {
      selectedDates.forEach(date => {
        setDatesAndShifts(prev => [...prev, { date: date.toISOString().split('T')[0], shiftIds: selectedShifts }]);
      });
      setSelectedDates([]);
      setSelectedShifts([]);
    }
  };
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        sx={{ backgroundColor: "#469E82" }}
        onClick={() => setOpenDialog(true)}
      >
        Add Nurse
      </Button>

      <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nurses.map((nurse) => (
              <TableRow key={nurse.id}>
                <TableCell>{nurse.firstName}</TableCell>
                <TableCell>{nurse.lastName}</TableCell>
                <TableCell>{nurse.email}</TableCell>
                <TableCell>{nurse.phone}</TableCell>
                <TableCell>{nurse.gender}</TableCell>
                <TableCell>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => handleEditNurse(nurse)}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => dispatch(deleteNurse(nurse.id))}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add Nurse</DialogTitle>
        <DialogContent>
          <TextField
            label="Nurse Name"
            fullWidth
            value={nurseName}
            onChange={(e) => setNurseName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Specialization"
            fullWidth
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            margin="normal"
          />

          <Calendar
            onChange={handleDateChange}
            value={selectedDates}
            selectRange={false}
            tileClassName={({ date }) => {
              return selectedDates.find(selectedDate => selectedDate.toDateString() === date.toDateString()) ? 'selected-date' : '';
            }}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Shifts</InputLabel>
            <Select
              multiple
              value={selectedShifts}
              onChange={(e) => setSelectedShifts(e.target.value)}
              renderValue={(selected) =>
                selected.map((shiftId) =>
                  shifts.find((shift) => shift.id === shiftId)?.name
                ).join(", ")
              }
            >
              {shifts.map((shift) => (
                <MenuItem key={shift.id} value={shift.id}>
                  <Checkbox checked={selectedShifts.indexOf(shift.id) > -1} />
                  <ListItemText primary={shift.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="outlined" onClick={handleAddDateShift}>
            Add Date and Shifts
          </Button>

          <div style={{ marginTop: "1rem" }}>
            <h4>Added Dates and Shifts:</h4>
            {datesAndShifts.map((item, index) => (
              <div key={index}>
                Date: {item.date} | Shifts: {item.shiftIds.map(shiftId => shifts.find(shift => shift.id === shiftId)?.name).join(", ")}
              </div>
            ))}
          </div>

          <FormControl fullWidth margin="normal">
            <InputLabel>Department</InputLabel>
            <Select
              value={selectedDepartmentId}
              onChange={(e) => setSelectedDepartmentId(e.target.value)}
            >
              {departments.map(department => (
                <MenuItem key={department.id} value={department.id}>
                  {department.departmentName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handleAddNurse} color="primary">Add Nurse</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openScheduleDialog} onClose={() => setOpenScheduleDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Nurse Schedules</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Shifts</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedNurseSchedules.map((schedule) => (
                <TableRow key={schedule.date}>
                  <TableCell>{schedule.date}</TableCell>
                  <TableCell>{schedule.shifts}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenScheduleDialog(false)} color="secondary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NurseManagement;
