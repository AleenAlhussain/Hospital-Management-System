import React from "react";
import { NavLink } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventIcon from "@mui/icons-material/Event";
import CloseIcon from "@mui/icons-material/Close";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import BusinessIcon from "@mui/icons-material/Business";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import logo from "../Assets/logo.png";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

const Sidebar = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : undefined}
      onClose={isMobile ? onClose : undefined}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      {isMobile && (
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 16, right: 16 }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <img
        src={logo}
        alt="Budget Management Logo"
        style={{ padding: 16, width: "50%" }}
      />
      <List>
        <ListItem
          button
          component={NavLink}
          to="/"
          onClick={onClose}
          sx={{
            padding: 2,
            color: "grey.700",
            "&:hover": { color: "#469E82" },
            "&.active": { color: "#469E82" },
          }}
        >
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <DashboardIcon sx={{ color: "#469E82" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
          {isMobile && <ChevronRightIcon />}
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/rooms"
          onClick={onClose}
          sx={{
            padding: 2,
            color: "grey.700",
            "&:hover": { color: "#469E82" },
            "&.active": { color: "#469E82" },
          }}
        >
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <BedroomChildIcon sx={{ color: "#469E82" }} />
          </ListItemIcon>
          <ListItemText primary="Rooms" />
          {isMobile && <ChevronRightIcon />}
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/departments"
          onClick={onClose}
          sx={{
            padding: 2,
            color: "grey.700",
            "&:hover": { color: "#469E82" },
            "&.active": { color: "#469E82" },
          }}
        >
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <BusinessIcon sx={{ color: "#469E82" }} />
          </ListItemIcon>
          <ListItemText primary="Departments" />
          {isMobile && <ChevronRightIcon />}
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/patients"
          onClick={onClose}
          sx={{
            padding: 2,
            color: "grey.700",
            "&:hover": { color: "#469E82" },
            "&.active": { color: "#469E82" },
          }}
        >
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <PeopleIcon sx={{ color: "#469E82" }} />
          </ListItemIcon>
          <ListItemText primary="Patients" />
          {isMobile && <ChevronRightIcon />}
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/doctors"
          onClick={onClose}
          sx={{
            padding: 2,
            color: "grey.700",
            "&:hover": { color: "#469E82" },
            "&.active": { color: "#469E82" },
          }}
        >
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <HealthAndSafetyIcon sx={{ color: "#469E82" }} />
          </ListItemIcon>
          <ListItemText primary="Doctors" />
          {isMobile && <ChevronRightIcon />}
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/services"
          onClick={onClose}
          sx={{
            padding: 2,
            color: "grey.700",
            "&:hover": { color: "#469E82" },
            "&.active": { color: "#469E82" },
          }}
        >
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <LocalHospitalIcon sx={{ color: "#469E82" }} />{" "}
          </ListItemIcon>
          <ListItemText primary="Services" />
          {isMobile && <ChevronRightIcon />}
        </ListItem>

        <ListItem
          button
          component={NavLink}
          to="/appointments"
          onClick={onClose}
          sx={{
            padding: 2,
            color: "grey.700",
            "&:hover": { color: "#469E82" },
            "&.active": { color: "#469E82" },
          }}
        >
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <EventIcon sx={{ color: "#469E82" }} />
          </ListItemIcon>
          <ListItemText primary="Appointments" />
          {isMobile && <ChevronRightIcon />}
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/surgery-scheduler"
          onClick={onClose}
          sx={{
            padding: 2,
            color: "grey.700",
            "&:hover": { color: "#469E82" },
            "&.active": { color: "#469E82" },
          }}
        >
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <MedicalServicesIcon sx={{ color: "#469E82" }} />
          </ListItemIcon>
          <ListItemText primary="Surgery Scheduler" />
          {isMobile && <ChevronRightIcon />}
        </ListItem>

      </List>
    </Drawer>
  );
};

export default Sidebar;
