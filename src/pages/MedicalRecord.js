import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMedicalRecord,
  updateMedicalRecord,deleteMedicalRecord,
} from "../redux/medicalRecordSlice";
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

const MedicalRecordManagement = () => {
  const dispatch = useDispatch();
  const medicalRecords = useSelector(
    (state) => state.medicalRecord.medicalRecords
  );
  const doctors = useSelector((state) => state.doctor.doctors);
  const patients = useSelector((state) => state.patients.patients);

  const [recordNumber, setRecordNumber] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [date, setDate] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setRecordNumber("");
    setDoctorId("");
    setSelectedPatientId("");
    setDate("");
    setDiagnosis("");
    setTreatment("");
  };
  const handleEditRecord = (record) => {
    setEditingRecord(record);
    setRecordNumber(record.recordNumber);
    setDoctorId(record.doctorId);
    setSelectedPatientId(record.patientId);
    setDate(record.date);
    setDiagnosis(record.diagnosis);
    setTreatment(record.treatment);
    setOpenDialog(true);
  };


const handleAddMedicalRecord = () => {
  if (
    recordNumber &&
    doctorId &&
    selectedPatientId &&
    date &&
    diagnosis &&
    treatment
  ) {
    const newRecord = {
      id: editingRecord ? editingRecord.id : Date.now(),
      recordNumber,
      doctorId,
      patientId: selectedPatientId,
      date,
      diagnosis,
      treatment,
    };

    if (editingRecord) {
      dispatch(updateMedicalRecord(newRecord));
    } else {
      dispatch(addMedicalRecord(newRecord));
    }

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
        Add Medical Record
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Record Number</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Diagnosis</TableCell>
              <TableCell>Treatment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicalRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.recordNumber}</TableCell>
                <TableCell>
                  {doctors.find((doc) => doc.id === record.doctorId)?.name ||
                    "N/A"}
                </TableCell>
                <TableCell>
                  {patients.find((pat) => pat.id === record.patientId)
                    ?.firstName || "N/A"}
                </TableCell>
                <TableCell>{record.date}</TableCell>{" "}
                <TableCell>{record.diagnosis}</TableCell>
                <TableCell>{record.treatment}</TableCell>
                <TableCell>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => handleEditRecord(record)}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => dispatch(deleteMedicalRecord(record.id))}
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
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add Medical Record</DialogTitle>
        <DialogContent>
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
    <InputLabel>Patient</InputLabel>
    <Select
      value={selectedPatientId}
      onChange={(e) => setSelectedPatientId(e.target.value)}
    >
      {patients.map((patient) => (
        <MenuItem key={patient.id} value={patient.id}>
          {patient.firstName} {patient.lastName}
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
    InputLabelProps={{ shrink: true }}
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
</DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "#469E82" }}>
            Cancel
          </Button>
          <Button onClick={handleAddMedicalRecord} sx={{ color: "#469E82" }}>
            Add Medical Record
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MedicalRecordManagement;
