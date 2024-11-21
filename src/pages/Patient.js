import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPatient,
  updatePatient,
  removePatient,
} from "../redux/patientSlice";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { addMedicalRecord } from "../redux/medicalRecordSlice";
import { addAppointment } from "../redux/appointmentSlice";
import { addPatientService } from "../redux/patientServiceSlice";
const PatientManagement = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const rooms = useSelector((state) => state.room.rooms);
  const doctors = useSelector((state) => state.doctor.doctors);
  const services = useSelector((state) => state.services.services);
  const patientServices = useSelector(
    (state) => state.patientService.patientServices
  );
  const medicalRecords = useSelector(
    (state) => state.medicalRecord.medicalRecords
  );
  const staffSchedules = useSelector(
    (state) => state.staffSchedule.staffSchedules
  );
  const appointments = useSelector((state) => state.appointment.appointments);

  const departments = useSelector((state) => state.department.departments);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [servicePatientId, setServicePatientId] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [openServiceDialog, setOpenServiceDialog] = useState(false);
  const [admissionDate, setAdmissionDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [status, setStatus] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [openMedicalDialog, setOpenMedicalDialog] = useState(false);
  const [medicalRecordType, setMedicalRecordType] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [schedule, setSchedule] = useState("");
  const [recordNumber, setRecordNumber] = useState("");
  const [date, setDate] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [patientId, setPatientId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [selectedScheduleId, setSelectedScheduleId] = useState("");

  const [serviceData, setServiceData] = useState({
    serviceId: "",
    date: "",
    status: "",
    result: "",
  });

  const handleAddPatient = () => {
    if (firstName && lastName && dateOfBirth && gender && phone && address) {
      const newPatient = {
        id: Date.now(),
        firstName,
        lastName,
        dateOfBirth,
        gender,
        phone,
        address,
        medicalHistory,
      };

      dispatch(addPatient(newPatient));
      resetForm();
      setOpenDialog(false);
    }
  };

  const handleUpdatePatient = () => {
    if (editingPatient) {
      const updatedPatient = {
        ...editingPatient,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        phone,
        address,
        medicalHistory,
      };

      dispatch(updatePatient(updatedPatient));
      resetForm();
      setOpenDialog(false);
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setDateOfBirth("");
    setGender("");
    setPhone("");
    setAddress("");
    setMedicalHistory("");
    setEditingPatient(null);
    setPatientId("");
    setSelectedDepartmentId("");
    setSelectedRoomId("");
    setAdmissionDate("");
    setDischargeDate("");
    setStatus("");
    setMedicalRecordType("");
    setSelectedDoctorId("");
    setSchedule("");
    setSelectedSchedule("");
    setRecordNumber("");
    setDate("");
    setDiagnosis("");
    setTreatment("");
  };
  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setSelectedRoomId(patient.roomId);
    setSelectedDoctorId(patient.doctorId);
    setSelectedServiceId(patient.serviceId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    resetForm();
    setOpenDialog(false);
  };

  useEffect(() => {
    setFilteredPatients(patients);
  }, [patients]);

  const handleFilterPatients = () => {
    const start = startDate
      ? new Date(startDate).toISOString().split("T")[0]
      : null;
    const end = endDate ? new Date(endDate).toISOString().split("T")[0] : null;

    const filtered = patients.filter((patient) => {
      const patientDate = patient.date;

      if (start && end) {
        return patientDate >= start && patientDate <= end;
      } else if (start) {
        return patientDate >= start;
      } else if (end) {
        return patientDate <= end;
      }
      return true;
    });

    setFilteredPatients(filtered);
  };

  const handleResetFilter = () => {
    setFilteredPatients(patients);
    setStartDate("");
    setEndDate("");
  };
  const handleOpenServiceDialog = (patientId) => {
    setServicePatientId(patientId);
    setOpenServiceDialog(true);
  };

  const handleCloseServiceDialog = () => {
    setOpenServiceDialog(false);
    setServicePatientId(null);
    setServiceData({
      serviceId: "",
      date: "",
      status: "",
      result: "",
    });
  };
  const handleAddService = () => {
    if (servicePatientId) {
      const newService = {
        patient_id: servicePatientId,
        service_id: serviceData.serviceId,
        date: serviceData.date,
        status: serviceData.status,
        result: serviceData.result,
      };
      dispatch(addPatientService(newService));
      resetForm();
      handleCloseServiceDialog();
    }
  };
  const handleOpenMedicalDialog = (patientId) => {
    setSelectedPatientId(patientId);
    setOpenMedicalDialog(true);
  };

  const resetMedicalForm = () => {
    setMedicalRecordType("");
    setSelectedDoctorId("");
    setSchedule("");
    setSelectedSchedule("");
    setSelectedRoomId("");
    setAdmissionDate("");
    setDischargeDate("");
    setStatus("");
  };

  const handleCloseMedicalDialog = () => {
    resetMedicalForm();
    setOpenMedicalDialog(false);
  };

  const handleAccept = () => {
    const newMedicalRecord = {
      patientId: selectedPatientId,
      departmentId: selectedDepartmentId,
      roomId: selectedRoomId,
      admissionDate,
      dischargeDate,
      status,
      recordNumber: recordNumber,
      doctorId: selectedDoctorId,
      date: date,
      diagnosis: diagnosis,
      treatment: treatment,
    };
    dispatch(addMedicalRecord(newMedicalRecord));
    resetForm();
    handleCloseMedicalDialog();
  };
  const handleBookAppointment = () => {
    const newBookAppointment = {
      patientId: selectedPatientId,
      doctorId: selectedDoctorId,
      scheduleId: selectedSchedule,
    };
    dispatch(addAppointment(newBookAppointment));
    resetForm();
    handleCloseMedicalDialog();
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
        sx={{ backgroundColor: "#469E82" }}
        onClick={() => setOpenDialog(true)}
      >
        Add Patient
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
          onClick={handleFilterPatients}
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
              <TableCell>Name</TableCell>

              <TableCell>Department</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => {
                const patientSpecificServices = patientServices.filter(
                  (service) => service.patient_id === patient.id
                );
                const patientMedicalRecords = medicalRecords.filter(
                  (record) => record.patientId === patient.id
                );
                const patientDoctors = appointments.filter(
                  (appointment) => appointment.patientId === patient.id
                );
                const latestRecord =
                  patientMedicalRecords.length > 0
                    ? patientMedicalRecords[0]
                    : null;
                    const room = latestRecord 
                    ? rooms.find(rm => rm.id === latestRecord.roomId) 
                    : null;
                    const department = latestRecord 
                  ? departments.find(dept => dept.id === latestRecord.departmentId) 
                  : null;

const doctor = patientDoctors.length > 0 
? doctors.find((doc) => doc.id === patientDoctors[0].doctorId) 
: null;
                return (
                  <TableRow key={patient.id}>
                    <TableCell>{`${patient.firstName} ${patient.lastName}`}</TableCell>
                    
                    <TableCell>
                      {department ? department.departmentName : "( - )"}
                    </TableCell>
                    <TableCell>
                      {room ? room.number : "( - )"}
                    </TableCell>
                    <TableCell>
                      {doctor ? doctor.name : "( - )"}
                    </TableCell>
                    <TableCell>
                      {patientSpecificServices.length > 0
                        ? patientSpecificServices.map((service) => (
                            <div key={service.service_id}>
                              {services.find((s) => s.id === service.service_id)
                                ?.name || service.service_id}
                            </div>
                          ))
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {latestRecord ? latestRecord.status || "-" : "-"}
                    </TableCell>
                    <TableCell>
                      <Button
                        sx={{ color: "#469E82" }}
                        onClick={() => handleOpenServiceDialog(patient.id)}
                      >
                        Service
                      </Button>
                      <TableCell>
                        <Button
                          sx={{ color: "#469E82" }}
                          onClick={() => handleOpenMedicalDialog(patient.id)}
                        >
                          Medical Records
                        </Button>
                      </TableCell>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No patients found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>
          {editingPatient ? "Edit Patient" : "Add Patient"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            type="date"
            label="Date of Birth"
            InputLabelProps={{ shrink: true }}
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select value={gender} onChange={(e) => setGender(e.target.value)}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Phone"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Medical History"
            variant="outlined"
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "#469E82" }}>
            Cancel
          </Button>
          <Button
            onClick={editingPatient ? handleUpdatePatient : handleAddPatient}
            sx={{ color: "#469E82" }}
          >
            {editingPatient ? "Update Patient" : "Add Patient"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openServiceDialog}
        onClose={handleCloseServiceDialog}
        fullWidth
      >
        <DialogTitle>Add Service Details</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Service</InputLabel>
            <Select
              value={serviceData.serviceId}
              onChange={(e) =>
                setServiceData({ ...serviceData, serviceId: e.target.value })
              }
            >
              {services.map((service) => (
                <MenuItem key={service.id} value={service.id}>
                  {service.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            type="date"
            fullWidth
            label="Date"
            InputLabelProps={{ shrink: true }}
            value={serviceData.date}
            onChange={(e) =>
              setServiceData({ ...serviceData, date: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Status"
            value={serviceData.status}
            onChange={(e) =>
              setServiceData({ ...serviceData, status: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Result"
            value={serviceData.result}
            onChange={(e) =>
              setServiceData({ ...serviceData, result: e.target.value })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseServiceDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddService} color="primary">
            Add Service
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openMedicalDialog}
        onClose={handleCloseMedicalDialog}
        fullWidth
      >
        <DialogTitle>
          {medicalRecordType === "book" ? "Book Appointment" : "Medical Record"}
        </DialogTitle>
        <DialogContent>
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
          <Button
            variant="contained"
            sx={{ marginRight: 2, backgroundColor: "#469E82" }}
            onClick={() => setMedicalRecordType("book")}
          >
            Book an Appointment
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#469E82" }}
            onClick={() => setMedicalRecordType("accept")}
          >
            Accept
          </Button>
          {medicalRecordType === "accept" && (
            <>
              <FormControl fullWidth margin="normal">
                <InputLabel>Room</InputLabel>
                <Select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                >
                  {rooms.map((room) => (
                    <MenuItem key={room.id} value={room.id}>
                      {room.number}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Record Number"
                fullWidth
                value={recordNumber}
                onChange={(e) => setRecordNumber(e.target.value)}
                margin="normal"
              />
              <TextField
                type="date"
                label="Date"
                fullWidth
                value={date}
                onChange={(e) => setDate(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Diagnosis"
                fullWidth
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Treatment"
                fullWidth
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                margin="normal"
              />
              <TextField
                type="date"
                label="Date of Admission"
                fullWidth
                value={admissionDate}
                onChange={(e) => setAdmissionDate(e.target.value)}
                margin="normal"
              />
              <TextField
                type="date"
                label="Date of Discharge"
                fullWidth
                value={dischargeDate}
                onChange={(e) => setDischargeDate(e.target.value)}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="Admitted">Admitted</MenuItem>
                  <MenuItem value="Discharged">Discharged</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
          {medicalRecordType === "book" && (
            <>
              <FormControl fullWidth margin="normal">
                <InputLabel>Doctor</InputLabel>
                <Select
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
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
                  value={selectedScheduleId}
                  onChange={(e) => setSelectedScheduleId(e.target.value)}
                  disabled={!selectedDoctorId}
                >
                  {(() => {
                    if (selectedDoctorId) {
                      const filteredSchedules = staffSchedules.filter(
                        (schedule) => schedule.doctor_id === selectedDoctorId
                      );
                      const groupedSchedules =
                        groupSchedulesByDate(filteredSchedules);
                      const lastThreeSchedules =
                        Object.entries(groupedSchedules).slice(-3);

                      return lastThreeSchedules.map(([date, shiftIds]) => (
                        <MenuItem key={date} value={date}>
                          <strong>Date:</strong> {date} |{" "}
                          <strong>Shifts:</strong> {shiftIds.join(", ")}
                        </MenuItem>
                      ));
                    }
                    return null;
                  })()}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMedicalDialog} sx={{ color: "#469E82" }}>
            Cancel
          </Button>
          {medicalRecordType === "accept" && (
            <Button onClick={handleAccept} sx={{ color: "#469E82" }}>
              Submit
            </Button>
          )}
          {medicalRecordType === "book" && (
            <Button onClick={handleBookAppointment} sx={{ color: "#469E82" }}>
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PatientManagement;
