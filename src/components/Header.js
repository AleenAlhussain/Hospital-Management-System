import React from "react";
import { Grid, Toolbar, IconButton, Badge, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Notifications } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = ({ handleDrawerOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Grid sx={{ backgroundColor: "#F8F9FA" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerOpen}
        >
          <MenuIcon sx={{ color: "#003a66" }} />
        </IconButton>

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <Notifications sx={{ color: "#003a66" }} />
            </Badge>
          </IconButton>
          {user ? (
            <>
              <IconButton color="inherit" onClick={handleLogout}>
                <Avatar alt={user.name}/>
              </IconButton>
              <IconButton
                sx={{
                  backgroundColor: "#003a66",
                  "&:hover": {
                    backgroundColor: "#003a66",
                  },
                  color: "white",
                }}
                onClick={handleLogout}
              >
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            null
          )}
        </div>
      </Toolbar>
    </Grid>
  );
};

export default Header;
