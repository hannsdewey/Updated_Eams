import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Localizer for moment.js
const localizer = momentLocalizer(moment);

const ShiftSchedule = () => {
  const [events, setEvents] = useState([]); // All events
  const [openModal, setOpenModal] = useState(false);
  const [shiftDetails, setShiftDetails] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    employee: "",
  });
  const [openShiftModal, setOpenShiftModal] = useState(false); // For viewing shift details
  const [selectedShift, setSelectedShift] = useState(null); // Currently clicked shift

  // Example employees
  const employees = ["John Doe", "Jane Smith", "Michael Scott"];
  const CEO_NAME = "John Doe"; // Replace with dynamic logic for real scenarios

  // Filter events to show only those assigned to the CEO
  const filteredEvents = events.filter((event) => event.employee === CEO_NAME);

  // Open create shift modal
  const handleOpenModal = () => {
    setShiftDetails({
      title: "",
      start: new Date(),
      end: new Date(),
      employee: "",
    });
    setOpenModal(true);
  };

  // Close create shift modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Save shift
  const handleSaveShift = () => {
    const newEvent = {
      title: shiftDetails.title,
      start: shiftDetails.start,
      end: shiftDetails.end,
      employee: shiftDetails.employee,
    };

    setEvents([...events, newEvent]);
    handleCloseModal();
  };

  // Handle clicking on a shift
  const handleSelectEvent = (event) => {
    setSelectedShift(event);
    setOpenShiftModal(true);
  };

  // Close shift details modal
  const handleCloseShiftModal = () => {
    setOpenShiftModal(false);
    setSelectedShift(null);
  };

  return (
    <Box sx={{ padding: "1rem", marginTop: "2rem" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
        sx={{ marginBottom: "1rem" }}
      >
        Create Shift
      </Button>

      {/* Calendar Component */}
      <Calendar
        localizer={localizer}
        events={filteredEvents} // Show only CEO's shifts
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent} // Handle event click
      />

      {/* Create Shift Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Create Shift</DialogTitle>
        <DialogContent>
          <TextField
            label="Shift Title"
            fullWidth
            value={shiftDetails.title}
            onChange={(e) =>
              setShiftDetails({ ...shiftDetails, title: e.target.value })
            }
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Employee"
            select
            fullWidth
            value={shiftDetails.employee}
            onChange={(e) =>
              setShiftDetails({ ...shiftDetails, employee: e.target.value })
            }
            SelectProps={{
              native: true,
            }}
            sx={{ marginBottom: "1rem" }}
          >
            <option value=""></option>
            {employees.map((employee, index) => (
              <option key={index} value={employee}>
                {employee}
              </option>
            ))}
          </TextField>

          <TextField
            label="Start Time"
            type="datetime-local"
            fullWidth
            value={moment(shiftDetails.start).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) =>
              setShiftDetails({
                ...shiftDetails,
                start: new Date(e.target.value),
              })
            }
            sx={{ marginBottom: "1rem" }}
          />

          <TextField
            label="End Time"
            type="datetime-local"
            fullWidth
            value={moment(shiftDetails.end).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) =>
              setShiftDetails({
                ...shiftDetails,
                end: new Date(e.target.value),
              })
            }
            sx={{ marginBottom: "1rem" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveShift} color="primary">
            Save Shift
          </Button>
        </DialogActions>
      </Dialog>

      {/* Shift Details Modal */}
      {selectedShift && (
        <Dialog open={openShiftModal} onClose={handleCloseShiftModal}>
          <DialogTitle>Shift Details</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{selectedShift.title}</Typography>
            <Typography>
              <strong>Employee:</strong> {selectedShift.employee}
            </Typography>
            <Typography>
              <strong>Start:</strong>{" "}
              {moment(selectedShift.start).format("YYYY-MM-DD HH:mm")}
            </Typography>
            <Typography>
              <strong>End:</strong>{" "}
              {moment(selectedShift.end).format("YYYY-MM-DD HH:mm")}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseShiftModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ShiftSchedule;
