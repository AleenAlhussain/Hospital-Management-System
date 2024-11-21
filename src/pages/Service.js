import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addService,
  updateService,
  deleteService,
} from "../redux/serviceSlice";
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

const ServiceManagement = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services.services);
  const [serviceName, setServiceName] = useState("");
  const [serviceAvailability, setServiceAvailability] = useState("");
  const [serviceCost, setServiceCost] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [filteredServices, setFilteredServices] = useState(services);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAddService = () => {
    if (serviceName && serviceAvailability && serviceCost && serviceType) {
      const newService = {
        id: Date.now(),
        name: serviceName,
        availability: serviceAvailability,
        cost: serviceCost,
        type: serviceType,
        date: new Date().toISOString().split("T")[0],
      };
      dispatch(addService(newService));
      resetForm();
      handleCloseDialog();
    }
  };

  const handleUpdateService = () => {
    if (editingService) {
      const updatedService = {
        id: editingService.id,
        name: serviceName,
        availability: serviceAvailability,
        cost: serviceCost,
        type: serviceType,
        date: editingService.date,
      };
      dispatch(updateService(updatedService));
      resetForm();
      handleCloseDialog();
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceName(service.name);
    setServiceAvailability(service.availability);
    setServiceCost(service.cost);
    setServiceType(service.type);
    setOpenDialog(true);
  };

  const resetForm = () => {
    setServiceName("");
    setServiceAvailability("");
    setServiceCost("");
    setServiceType("");
    setEditingService(null);
  };

  const handleCloseDialog = () => {
    resetForm();
    setOpenDialog(false);
  };

  useEffect(() => {
    setFilteredServices(services);
  }, [services]);

  const handleFilterServices = () => {
    const start = startDate
      ? new Date(startDate).toISOString().split("T")[0]
      : null;
    const end = endDate ? new Date(endDate).toISOString().split("T")[0] : null;

    const filtered = services.filter((service) => {
      const serviceDate = service.date;

      if (start && end) {
        return serviceDate >= start && serviceDate <= end;
      } else if (start) {
        return serviceDate >= start;
      } else if (end) {
        return serviceDate <= end;
      }
      return true;
    });

    setFilteredServices(filtered);
  };

  const handleResetFilter = () => {
    setFilteredServices(services);
    setStartDate("");
    setEndDate("");
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        sx={{ backgroundColor: "#469E82" }}
        onClick={() => setOpenDialog(true)}
      >
        Add Service
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
          onClick={handleFilterServices}
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
              <TableCell>Service Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServices.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.type}</TableCell>
                <TableCell>{service.availability}</TableCell>
                <TableCell>{service.cost}</TableCell>
                <TableCell>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => handleEditService(service)}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{ color: "#469E82" }}
                    onClick={() => dispatch(deleteService(service.id))}
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
          {editingService ? "Edit Service" : "Add Service"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Service Name"
            fullWidth
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            >
              <MenuItem value="Imaging">Imaging</MenuItem>
              <MenuItem value="Lab Tests">Lab Tests</MenuItem>
              <MenuItem value="Therapy">Therapy</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Availability</InputLabel>
            <Select
              value={serviceAvailability}
              onChange={(e) => setServiceAvailability(e.target.value)}
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Not Available">Not Available</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Cost"
            fullWidth
            value={serviceCost}
            onChange={(e) => setServiceCost(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "#469E82" }}>
            Cancel
          </Button>
          <Button
            onClick={editingService ? handleUpdateService : handleAddService}
            sx={{ color: "#469E82" }}
          >
            {editingService ? "Update Service" : "Add Service"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ServiceManagement;
