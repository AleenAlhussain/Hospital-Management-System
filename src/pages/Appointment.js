import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAppointment, updateAppointment } from "../redux/appointmentSlice";
import {
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

const AppointmentManagement = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment.appointments);
  const doctors = useSelector((state) => state.doctor.doctors);
  const staffSchedules = useSelector(
    (state) => state.staffSchedule.staffSchedules
  );
  const patients = useSelector((state) => state.patients.patients);
  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setDoctorId("");
    setPatientId("");
    setSelectedSchedule("");
  };

  const handleAddAppointments = () => {
    if (patientId && doctorId && selectedSchedule) {
      const newAppointment = {
        id: Date.now(),
        patientId: patientId,
        doctorId: doctorId,
        scheduleId: selectedSchedule,
      };
      dispatch(addAppointment(newAppointment));
      resetForm();
      handleCloseDialog();
    }
  };

  const handleUpdateAppointments = () => {
    if (editingSchedule) {
      const updatedSchedule = {
        id: editingSchedule.id,
        patientId: patientId,
        doctorId: doctorId,
        scheduleId: selectedSchedule,
      };
      dispatch(updateAppointment(updatedSchedule));
      handleCloseDialog();
    }
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
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        sx={{ backgroundColor: "#469E82", marginBottom: 2 }}
      >
        Add Appointments
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Schedule</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => {
              const patient = patients.find(
                (p) => p.id === appointment.patientId
              );
              return (
                <TableRow key={appointment.id}>
                  <TableCell>
                    {patient
                      ? `${patient.firstName} ${patient.lastName}`
                      : "Patient Unavailable"}
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const doctor = doctors.find(
                        (doc) => doc.id === appointment.doctorId
                      );
                      return doctor ? doctor.name : "Doctor Unavailable";
                    })()}
                  </TableCell>
                  <TableCell>{appointment.scheduleId}</TableCell>
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
          {editingSchedule ? "Edit Appointment" : "Add Appointment"}
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
                  {patient.firstName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Doctor</InputLabel>
            <Select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
            >
              {doctors.map((doctor) => (
                <MenuItem key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Schedule</InputLabel>
            <Select
              value={selectedSchedule}
              onChange={(e) => setSelectedSchedule(e.target.value)}
              disabled={!doctorId}
            >
              {(() => {
                if (doctorId) {
                  const filteredSchedules = staffSchedules.filter(
                    (schedule) => schedule.doctor_id === doctorId
                  );
                  const groupedSchedules =
                    groupSchedulesByDate(filteredSchedules);
                  const lastThreeSchedules =
                    Object.entries(groupedSchedules).slice(-3);

                  return lastThreeSchedules.map(([date, shiftIds]) => (
                    <MenuItem key={date} value={date}>
                      <strong>Date:</strong> {date} | <strong>Shifts:</strong>{" "}
                      {shiftIds.join(", ")}
                    </MenuItem>
                  ));
                }
                return null;
              })()}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={
              editingSchedule ? handleUpdateAppointments : handleAddAppointments
            }
            sx={{ color: "#469E82" }}
          >
            {editingSchedule ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AppointmentManagement;
