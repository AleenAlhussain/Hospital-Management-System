import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStaffSchedule,
  updateStaffSchedule,
  deleteStaffSchedule,
} from "../redux/staffScheduleSlice";
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
  TextField,
} from "@mui/material";

const StaffScheduleManagement = () => {
  const dispatch = useDispatch();
  const staffSchedules = useSelector(
    (state) => state.staffSchedule.staffSchedules
  );
  const nurses = useSelector((state) => state.nurse.nurses);
  const doctors = useSelector((state) => state.doctor.doctors);
  const shifts = useSelector((state) => state.shift.shifts);

  const [nurseId, setNurseId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [shiftId, setShiftId] = useState("");
  const [date, setDate] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [selectedDoctorSchedules, setSelectedDoctorSchedules] = useState([]);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setNurseId("");
    setDoctorId("");
    setShiftId("");
    setDate("");
  };

  const handleEditSchedule = (schedule) => {
    setEditingSchedule(schedule);
    setNurseId(schedule.nurse_id);
    setDoctorId(schedule.doctor_id);
    setShiftId(schedule.shift_id);
    setDate(schedule.date);
    setOpenDialog(true);
  };

  const handleAddStaffSchedule = () => {
    if (nurseId && doctorId && shiftId && date) {
      const newSchedule = {
        id: Date.now(),
        nurse_id: nurseId,
        doctor_id: doctorId,
        shift_id: shiftId,
        date,
      };
      dispatch(addStaffSchedule(newSchedule));
      handleCloseDialog();
    }
  };

  const handleUpdateStaffSchedule = () => {
    if (editingSchedule) {
      const updatedSchedule = {
        id: editingSchedule.id,
        nurse_id: nurseId,
        doctor_id: doctorId,
        shift_id: shiftId,
        date,
      };
      dispatch(updateStaffSchedule(updatedSchedule));
      handleCloseDialog();
    }
  };
  const groupedSchedules = staffSchedules.reduce((acc, schedule) => {
    const doctorId = schedule.doctor_id;
    const nurseId = schedule.nurse_id;
    const doctor = doctors.find((doctor) => doctor.id === doctorId);
    const nurse = nurses.find((nurse) => nurse.id === nurseId);

    if (!acc[doctorId]) {
      acc[doctorId] = {
        doctor, 
        schedules: [],
        nurse,
      };
    }
    acc[doctorId].schedules.push(schedule);
    return acc;
  }, {});

  const handleCloseDetailsDialog = () => {
    setDetailsDialogOpen(false);
    setSelectedDoctorSchedules([]);
  };

  const handleShowDetails = (id, type) => {
    let schedulesForEntity = [];
    if (type === "doctor") {
      schedulesForEntity = staffSchedules.filter(
        (schedule) => schedule.doctor_id === id
      );
    } else if (type === "nurse") {
      schedulesForEntity = staffSchedules.filter(
        (schedule) => schedule.nurse_id === id
      );
    }

    const formattedSchedules = schedulesForEntity.map((schedule) => {
      const shiftName =
        shifts.find((shift) => shift.id === schedule.shift_id)?.name || "N/A";
      return {
        date: schedule.date,
        shift: shiftName,
      };
    });

    setSelectedDoctorSchedules(formattedSchedules);
    setDetailsDialogOpen(true);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        sx={{ backgroundColor: "#469E82", marginBottom: 2 }}
      >
        Add Staff Schedule
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nurse</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Shifts</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(groupedSchedules).map((group) => {
              const nurseSchedules = group.schedules; 
              const hasDoctors = group.doctor !== undefined;
              return (
                <React.Fragment key={group.doctor?.id}>
                  <TableRow>
                    <TableCell>
                      {nurseSchedules.length > 0
                        ? nurses.find(
                            (nurse) => nurse.id === nurseSchedules[0].nurse_id
                          )?.name || "N/A"
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {group.doctor ? group.doctor.name : "N/A"}
                    </TableCell>
                    <TableCell>
                      {nurseSchedules.slice(-3).map((schedule, index) => (
                        <div key={index}>
                          {shifts.find(
                            (shift) => shift.id === schedule.shift_id
                          )?.name || "N/A"}{" "}
                          | Date: {schedule.date}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      <Button
                        sx={{ color: "#469E82" }}
                        onClick={() => handleEditSchedule(nurseSchedules[0])}
                      >
                        Edit
                      </Button>
                      <Button
                        sx={{ color: "#469E82" }}
                        onClick={() =>
                          nurseSchedules.forEach((schedule) =>
                            dispatch(deleteStaffSchedule(schedule.id))
                          )
                        }
                      >
                        Delete All
                      </Button>
                      {!hasDoctors && (
                        <Button
                          sx={{ color: "#469E82", marginLeft: 1 }}
                          onClick={() =>
                            handleShowDetails(
                              nurseSchedules[0]?.nurse_id,
                              "nurse"
                            )
                          } 
                        >
                          Show Nurse Details
                        </Button>
                      )}
                      {hasDoctors && (
                        <Button
                          sx={{ color: "#469E82", marginLeft: 1 }}
                          onClick={() =>
                            handleShowDetails(group.doctor?.id, "doctor")
                          }
                        >
                          Show Doctor Details
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={detailsDialogOpen}
        onClose={handleCloseDetailsDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Doctor's Schedule Details</DialogTitle>
        <DialogContent>
          {selectedDoctorSchedules.length > 0 ? (
            selectedDoctorSchedules.map(({ date, shift }) => (
              <div key={date}>
                Date: {date} | Shift: {shift}
              </div>
            ))
          ) : (
            <div>No schedules found for this doctor.</div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailsDialog} sx={{ color: "#469E82" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingSchedule ? "Edit Staff Schedule" : "Add Staff Schedule"}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Nurse</InputLabel>
            <Select
              value={nurseId}
              onChange={(e) => setNurseId(e.target.value)}
            >
              {nurses.map((nurse) => (
                <MenuItem key={nurse.id} value={nurse.id}>
                  {nurse.name}
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
            <InputLabel>Shift</InputLabel>
            <Select
              value={shiftId}
              onChange={(e) => setShiftId(e.target.value)}
            >
              {shifts.map((shift) => (
                <MenuItem key={shift.id} value={shift.id}>
                  {shift.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={
              editingSchedule
                ? handleUpdateStaffSchedule
                : handleAddStaffSchedule
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

export default StaffScheduleManagement;
