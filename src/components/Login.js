import React, { useState } from "react";
import { Button, TextField, Box, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(loginStart());
    if (!email.trim() || !password.trim()) {
      dispatch(loginFailure("Email and Password cannot be empty."));
      return;
    }
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      dispatch(loginFailure("No registered user found."));
      return;
    }
    if (storedUser.email === email && storedUser.password === password) {
      dispatch(loginSuccess({ email }));
      navigate("/");
    } else {
      dispatch(loginFailure("Incorrect email or password."));
    }
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
          Welcome Back
        </Typography>
        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{
            backgroundColor: "#469E82",
            "&:hover": { backgroundColor: "#469E82" },
            borderRadius: "8px",
            padding: "10px 20px",
            fontWeight: "bold",
          }}
        >
          Login
        </Button>

        <Typography sx={{ mt: 2, fontSize: "14px" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ textDecoration: "none", color: "#469E82" }}>
            Register here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
