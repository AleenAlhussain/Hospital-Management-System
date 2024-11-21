import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addReceptionist,
  updateReceptionist,
  deleteReceptionist,
} from "../redux/receptionistSlice";
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

const ReceptionistManagement = () => {
  const dispatch = useDispatch();
  const receptionists = useSelector((state) => state.receptionist.receptionists);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingReceptionist, setEditingReceptionist] = useState(null);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setGender("");
  };

  const handleEditReceptionist = (receptionist) => {
    setEditingReceptionist(receptionist);
    setFirstName(receptionist.firstName);
    setLastName(receptionist.lastName);
    setEmail(receptionist.email);
    setPhone(receptionist.phone);
    setPassword(receptionist.password);
    setGender(receptionist.gender);
    setOpenDialog(true);
  };

  const handleAddReceptionist = () => {
    if (firstName && lastName && email && phone && password && gender) {
      const newReceptionist = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
      };
      dispatch(addReceptionist(newReceptionist));
      handleCloseDialog();
    }
  };

  const handleUpdateReceptionist = () => {
    if (editingReceptionist) {
      const updatedReceptionist = {
        id: editingReceptionist.id,
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
      };
      dispatch(updateReceptionist(updatedReceptionist));
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
        Add Receptionist
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
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
            {receptionists.map((receptionist) => (
              <TableRow key={receptionist.id}>
                <TableCell>{receptionist.firstName}</TableCell>
                <TableCell>{receptionist.lastName}</TableCell>
                <TableCell>{receptionist.email}</TableCell>
                <TableCell>{receptionist.phone}</TableCell>
                <TableCell>{receptionist.gender}</TableCell>
                <TableCell>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => handleEditReceptionist(receptionist)}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => dispatch(deleteReceptionist(receptionist.id))}
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
          {editingReceptionist ? "Edit Receptionist" : "Add Receptionist"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Phone"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Gender"
            fullWidth
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "#469E82" }}>
            Cancel
          </Button>
          <Button
            onClick={editingReceptionist ? handleUpdateReceptionist : handleAddReceptionist}
            sx={{ color: "#469E82" }}
          >
            {editingReceptionist ? "Update Receptionist" : "Add Receptionist"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReceptionistManagement;
