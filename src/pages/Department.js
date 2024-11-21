import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from "../redux/departmentSlice";
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

const Department = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDepartmentId, setCurrentDepartmentId] = useState(null);

  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.departments);
  const rooms = useSelector((state) => state.room.rooms);
  const doctors = useSelector((state) => state.doctor.doctors);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredDepartments, setfilteredDepartments] = useState(departments);

  const handleOpenDialog = (department = null) => {
    if (department) {
      setDepartmentName(department.departmentName);
      setIsEditing(true);
      setCurrentDepartmentId(department.id);
    } else {
      resetForm();
      setIsEditing(false);
      setCurrentDepartmentId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    resetForm();
    setOpenDialog(false);
  };

  const resetForm = () => {
    setDepartmentName("");
  };

  const handleAddOrUpdateDepartment = () => {
    if (!departmentName) {
      alert("Please fill all fields.");
      return;
    }

    const departmentData = {
      departmentName,
    };

    if (isEditing) {
      dispatch(
        updateDepartment({
          id: currentDepartmentId,
          updatedData: departmentData,
        })
      );
    } else {
      const newDepartment = {
        id: Date.now(),
        ...departmentData,
      };
      dispatch(addDepartment(newDepartment));
    }

    handleCloseDialog();
  };

  const handleDeleteDepartment = (id) => {
    dispatch(deleteDepartment(id));
  };

  useEffect(() => {
    setfilteredDepartments(departments);
  }, [departments]);

  const getRoomsForDepartment = (departmentId) => {
    return rooms.filter((room) => room.departmentId === departmentId);
  };

  const getDoctorsForDepartment = (departmentId) => {
    return doctors.filter((doctor) => doctor.departmentId === departmentId);
  };

  const handleFilterDepartments = () => {
    const start = startDate
      ? new Date(startDate).toISOString().split("T")[0]
      : null;
    const end = endDate ? new Date(endDate).toISOString().split("T")[0] : null;

    const filtered = departments.filter((department) => {
      const departmentDate = department.date;

      if (start && end) {
        return departmentDate >= start && departmentDate <= end;
      } else if (start) {
        return departmentDate >= start;
      } else if (end) {
        return departmentDate <= end;
      }
      return true;
    });

    setfilteredDepartments(filtered);
  };

  const handleResetFilter = () => {
    setfilteredDepartments(departments);
    setStartDate("");
    setEndDate("");
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        sx={{ backgroundColor: "#469E82", marginBottom: "1rem" }}
        onClick={() => handleOpenDialog()}
      >
        Add Department
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
          onClick={handleFilterDepartments}
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
              <TableCell>Department Name</TableCell>
              <TableCell>Rooms</TableCell>
              <TableCell>Doctors</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDepartments.map((department) => {
              const roomsForDepartment = getRoomsForDepartment(department.id);
              const doctorsForDepartment = getDoctorsForDepartment(
                department.id
              );

              return (
                <TableRow key={department.id}>
                  <TableCell>{department.departmentName}</TableCell>
                  <TableCell>
                    {roomsForDepartment.map((room) => room.type).join(", ") ||
                      "None"}
                  </TableCell>
                  <TableCell>
                    {doctorsForDepartment
                      .map((doctor) => doctor.name)
                      .join(", ") || "None"}
                  </TableCell>
                  <TableCell>
                    <Button
                      sx={{ color: "#469E82" }}
                      onClick={() => handleOpenDialog(department)}
                    >
                      Edit
                    </Button>
                    <Button
                      sx={{ color: "#469E82" }}
                      onClick={() => handleDeleteDepartment(department.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
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
          {isEditing ? "Edit Department" : "Add New Department"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Department Name"
            fullWidth
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "#469E82" }}>
            Cancel
          </Button>
          <Button
            onClick={handleAddOrUpdateDepartment}
            sx={{ color: "#469E82" }}
          >
            {isEditing ? "Update Department" : "Add Department"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Department;
