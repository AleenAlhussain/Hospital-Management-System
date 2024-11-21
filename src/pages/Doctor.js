import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDoctor, updateDoctor, deleteDoctor } from "../redux/doctorSlice";
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
  ListItemText,
  Checkbox,
} from "@mui/material";
import { selectDoctorsWithSchedules } from "../redux/selectDoctorsWithSchedules";
import {
  addStaffSchedule,
  updateStaffSchedule,
} from "../redux/staffScheduleSlice";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const DoctorManagement = () => {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctor.doctors);
  const departments = useSelector((state) => state.department.departments);
  const staffSchedules = useSelector(
    (state) => state.staffSchedule.staffSchedules
  );
  const shifts = useSelector((state) => state.shift.shifts);
  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");

  const [selectedShifts, setSelectedShifts] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const doctorsWithSchedules = useSelector(selectDoctorsWithSchedules);
  const [shiftId, setShiftId] = useState([]);
  const [openScheduleDialog, setOpenScheduleDialog] = useState(false);
  const [selectedDoctorSchedules, setSelectedDoctorSchedules] = useState([]);
  const [datesAndShifts, setDatesAndShifts] = useState([]);
  const handleDateChange = (date) => {
    if (Array.isArray(selectedDates)) {
      if (
        selectedDates.find(
          (selectedDate) => selectedDate.toDateString() === date.toDateString()
        )
      ) {
        setSelectedDates((prevDates) =>
          prevDates.filter(
            (selectedDate) =>
              selectedDate.toDateString() !== date.toDateString()
          )
        );
      } else {
        setSelectedDates((prevDates) => [...prevDates, date]);
      }
    } else {
      setSelectedDates([date]);
    }
  };

  const handleAddDateShift = () => {
    if (selectedDates.length > 0 && selectedShifts.length > 0) {
      selectedDates.forEach((date) => {
        setDatesAndShifts((prev) => [
          ...prev,
          { date: date.toISOString().split("T")[0], shiftIds: selectedShifts },
        ]);
      });
      setSelectedDates([]);
      setSelectedShifts([]);
    }
  };

  const handleAddDoctor = () => {
    if (
      doctorName &&
      specialization &&
      datesAndShifts.length > 0 &&
      selectedDepartmentId
    ) {
      const newDoctor = {
        id: Date.now(),
        name: doctorName,
        specialization,
        departmentId: selectedDepartmentId,
      };

      dispatch(addDoctor(newDoctor));

      datesAndShifts.forEach(({ date, shiftIds }) => {
        shiftIds.forEach((id) => {
          const newSchedule = {
            id: Date.now() + 1,
            doctor_id: newDoctor.id,
            shift_id: id,
            date,
          };

          dispatch(addStaffSchedule(newSchedule));
        });
      });

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
        departmentId: selectedDepartmentId,
      };

      dispatch(updateDoctor(updatedDoctor));

      shiftId.forEach((id) => {
        const updatedSchedule = {
          id: editingDoctor.schedule.id,
          doctor_id: updatedDoctor.id,
          shift_id: id,
          date: scheduleDate,
        };

        dispatch(updateStaffSchedule(updatedSchedule));
      });

      resetForm();
      handleCloseDialog();
    }
  };
  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor);
    setDoctorName(doctor.name);
    setSpecialization(doctor.specialization);
    setScheduleDate(doctor.schedule?.[0]?.date || "");
    setShiftId(
      doctor.schedule ? doctor.schedule.map((sched) => sched.shift_id) : []
    );
    setSelectedDepartmentId(doctor.departmentId);
    setOpenDialog(true);
  };

  const resetForm = () => {
    setDoctorName("");
    setSpecialization("");
    setDatesAndShifts([]);
    setSelectedDepartmentId("");
    setSelectedDates([]);
    setSelectedShifts([]);
    setEditingDoctor(null);
    setScheduleDate("");
  };

  const handleShowDetails = (doctor) => {
    const schedules = staffSchedules.filter(
      (schedule) => schedule.doctor_id === doctor.id
    );
    const groupedSchedules = groupSchedulesByDate(schedules);
    const formattedSchedules = Object.entries(groupedSchedules).map(
      ([date, shiftIds]) => ({
        date,
        shifts: shiftIds.join(", "),
      })
    );
    setSelectedDoctorSchedules(formattedSchedules);
    setOpenScheduleDialog(true);
  };

  const groupSchedulesByDate = (schedules) => {
    return schedules.reduce((acc, schedule) => {
      const date = schedule.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(schedule.shift_id);
      return acc;
    }, {});
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
            {doctorsWithSchedules.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell>
                  {departments.find((dept) => dept.id === doctor.departmentId)
                    ?.departmentName || "N/A"}
                </TableCell>
                <TableCell>
                  {(() => {
                    const groupedSchedules = groupSchedulesByDate(
                      staffSchedules.filter(
                        (schedule) => schedule.doctor_id === doctor.id
                      )
                    );

                    const lastThreeSchedules =
                      Object.entries(groupedSchedules).slice(-3);

                    return lastThreeSchedules.map(([date, shiftIds]) => (
                      <div key={date}>
                        Date: {date} | Shift: {shiftIds.join(", ")}
                      </div>
                    ));
                  })()}
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
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => handleShowDetails(doctor)}
                  >
                    Show Details
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
        <DialogTitle>Add Doctor</DialogTitle>
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
          <Calendar
            onChange={handleDateChange}
            value={selectedDates}
            selectRange={false}
            tileClassName={({ date }) => {
              return selectedDates.find(
                (selectedDate) =>
                  selectedDate.toDateString() === date.toDateString()
              )
                ? "selected-date"
                : "";
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Shifts</InputLabel>
            <Select
              multiple
              value={selectedShifts}
              onChange={(e) => setSelectedShifts(e.target.value)}
              renderValue={(selected) =>
                selected
                  .map(
                    (shiftId) =>
                      shifts.find((shift) => shift.id === shiftId)?.name
                  )
                  .join(", ")
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
                Date: {item.date} | Shifts:{" "}
                {item.shiftIds
                  .map(
                    (shiftId) =>
                      shifts.find((shift) => shift.id === shiftId)?.name
                  )
                  .join(", ")}
              </div>
            ))}
          </div>

          <FormControl fullWidth margin="normal">
            <InputLabel>Department</InputLabel>
            <Select
              value={selectedDepartmentId}
              onChange={(e) => setSelectedDepartmentId(e.target.value)}
            >
              {departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.departmentName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddDoctor} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openScheduleDialog}
        onClose={() => setOpenScheduleDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Doctor Schedule Details</DialogTitle>
        <DialogContent>
          {selectedDoctorSchedules.length > 0 ? (
            <div>
              {selectedDoctorSchedules.map(({ date, shifts }) => (
                <div key={date}>
                  Date: {date} | Shift: {shifts}
                </div>
              ))}
            </div>
          ) : (
            <div>No schedules available for this doctor.</div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenScheduleDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DoctorManagement;
