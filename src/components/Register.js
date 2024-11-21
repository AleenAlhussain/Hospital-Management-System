import React, { useState } from "react";
import { Button, TextField, Box, Typography, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = () => {
    dispatch(registerStart());

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      dispatch(registerFailure("All fields are required."));
      return;
    }

    if (name.length < 3) {
      dispatch(registerFailure("Name must be at least 3 characters."));
      return;
    }

    if (password.length < 6) {
      dispatch(registerFailure("Password must be at least 6 characters."));
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordError("");
    localStorage.setItem("user", JSON.stringify({ email, password }));
    dispatch(registerSuccess());
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 4, color: "#469E82", fontWeight: "bold" }}
        >
          Register
        </Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
        />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
          type="password"
        />
        <TextField
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
          type="password"
          error={Boolean(passwordError)}
          helperText={passwordError && "Passwords do not match."}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegister}
          sx={{
            backgroundColor: "#469E82",
            "&:hover": { backgroundColor: "#469E82" },
            borderRadius: "8px",
            padding: "10px 20px",
            fontWeight: "bold",
          }}
        >
          Register
        </Button>
      </Paper>
    </Box>
  );
};

export default Register;
