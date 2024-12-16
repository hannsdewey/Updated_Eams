import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import axios from "axios";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { formatDate } from "@fullcalendar/core";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  MenuItem,
  Select,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import "./ShiftSchedule.css";

const Calendar = () => {
  const [events, setEvents] = useState([]); // State for user-created events
  const [holidayEvents, setHolidayEvents] = useState([]); // State for holiday events
  const [viewMode, setViewMode] = useState("Events"); // Dropdown state for "Events" or "Shift"
  const [openModal, setOpenModal] = useState(false); // Modal open state
  const [newEventTitle, setNewEventTitle] = useState(""); // New event title
  const [selectedDate, setSelectedDate] = useState(null); // Store selected date for new event

  // Famous holidays for 2024 and 2025
  const famousHolidays = [
    { name: "New Year's Day", localName: "New Year's Day", date: "2024-01-01" },
    {
      name: "Independence Day",
      localName: "Independence Day",
      date: "2024-06-12",
    },
    {
      name: "All Saints' Day",
      localName: "All Saints' Day",
      date: "2024-11-01",
    },
    { name: "Christmas Day", localName: "Christmas Day", date: "2024-12-25" },
    { name: "Rizal Day", localName: "Rizal Day", date: "2024-12-30" },
    { name: "New Year's Day", localName: "New Year's Day", date: "2025-01-01" },
    {
      name: "Independence Day",
      localName: "Independence Day",
      date: "2025-06-12",
    },
    {
      name: "All Saints' Day",
      localName: "All Saints' Day",
      date: "2025-11-01",
    },
    { name: "Christmas Day", localName: "Christmas Day", date: "2025-12-25" },
    { name: "Rizal Day", localName: "Rizal Day", date: "2025-12-30" },
  ];

  // Holiday color mapping
  const holidayColorMap = {
    "New Year's Day": "#ff5733", // Red
    "Independence Day": "#1e90ff", // Blue
    "All Saints' Day": "#8a2be2", // Purple
    "Christmas Day": "#32cd32", // Green
    "Rizal Day": "#ff6347", // Tomato Red
  };

  // Fetch holidays and add to holidayEvents state
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(
          `https://date.nager.at/api/v3/PublicHolidays/${new Date().getFullYear()}/PH`
        );

        const filteredHolidays = response.data.filter(
          (holiday) =>
            !famousHolidays.some(
              (famousHoliday) =>
                famousHoliday.name === holiday.name &&
                famousHoliday.date === holiday.date
            )
        );

        const holidayEventsFromApi = filteredHolidays.map((holiday) => ({
          id: `holiday-${holiday.name}-${holiday.date}`,
          title: holiday.localName,
          start: holiday.date,
          allDay: true,
          color: holidayColorMap[holiday.localName] || "#ffa726", // Use the color map or default
          textColor: "white",
          isHoliday: true,
        }));

        const combinedHolidays = [
          ...famousHolidays.map((holiday) => ({
            id: `holiday-${holiday.name}-${holiday.date}`,
            title: holiday.localName,
            start: holiday.date,
            allDay: true,
            color: holidayColorMap[holiday.localName] || "#ffa726", // Use the color map or default
            textColor: "white",
            isHoliday: true,
          })),
          ...holidayEventsFromApi,
        ];

        setHolidayEvents(combinedHolidays);
      } catch (error) {
        const manualHolidayEvents = famousHolidays.map((holiday) => ({
          id: `holiday-${holiday.name}-${holiday.date}`,
          title: holiday.localName,
          start: holiday.date,
          allDay: true,
          color: holidayColorMap[holiday.localName] || "#ffa726", // Use the color map or default
          textColor: "white",
          isHoliday: true,
        }));

        setHolidayEvents(manualHolidayEvents);
      }
    };

    fetchHolidays();
  }, []);

  // Removed duplicate 'handleEventDrop'
  const handleEventDrop = (info) => {
    if (info.event.extendedProps.isHoliday) {
      info.revert(); // Prevent dragging holidays
      alert("Holidays cannot be moved.");
      return;
    }

    // Update the event's date in the state
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === info.event.id
          ? { ...event, start: info.event.startStr }
          : event
      )
    );

    // Optional: Notify user about the update
    alert(
      `Event '${info.event.title}' moved to ${formatDate(info.event.start, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`
    );
  };

  const handleDateClick = (selected) => {
    if (viewMode === "Events") {
      setSelectedDate(selected); // Store the selected date
      setOpenModal(true); // Open the modal for event creation
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setNewEventTitle(""); // Clear the title when the modal closes
  };

  const handleSaveEvent = () => {
    if (newEventTitle) {
      const newEvent = {
        id: `${selectedDate.dateStr}-${newEventTitle}`,
        title: newEventTitle,
        start: selectedDate.startStr,
        allDay: selectedDate.allDay,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      handleModalClose();
    }
  };

  const handleEventClick = (selected) => {
    if (selected.event.extendedProps.isHoliday) {
      alert("Holidays cannot be edited or deleted.");
      return;
    }

    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'?`
      )
    ) {
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== selected.event.id)
      );
    }
  };

  const handleEventDrag = (info) => {
    if (info.event.extendedProps.isHoliday) {
      info.revert();
    }
  };

  // Styled components for hover effect on menu items
  const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    "&:hover": {
      backgroundColor: theme.palette.primary.main, // Use theme's primary color for hover
      color: "white", // White text color on hover
    },
  }));

  // Custom styled Select with colored outline
  const CustomSelect = styled(Select)(({ theme }) => ({
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#6495ED", // Default blue border
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1E90FF", // Lighter blue border on hover
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4169E1", // Darker blue border on focus
    },
  }));

  return (
    <Box m="5px" marginTop="5%" height="85vh">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" component="h1" color="blue" fontWeight="bold">
          Shift Schedule
        </Typography>
        {/* Updated Dropdown with Colored Outline */}
        <FormControl sx={{ width: "120px" }} size="small">
          <CustomSelect
            id="viewMode"
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
          >
            <StyledMenuItem value="Events">Events</StyledMenuItem>
            <StyledMenuItem value="Shift">Shift</StyledMenuItem>
          </CustomSelect>
        </FormControl>
      </Box>
      <Typography
        variant="subtitle2"
        component="p"
        color="blue"
        marginBottom="1rem"
      >
        Full calendar interactive space
      </Typography>

      <Box display="flex" justifyContent="space-between" height="100%">
        {viewMode === "Events" && (
          <Box
            flex="1 1 15%"
            backgroundColor="#f0f0f0"
            p="15px"
            borderRadius="4px"
            overflow="auto"
          >
            <Typography variant="h7" color="blue">
              Events
            </Typography>
            <Box mt="10px">
              <List>
                {events.map((event) => (
                  <ListItem
                    key={event.id}
                    sx={{
                      backgroundColor: event.isHoliday ? "#ffa726" : "#6495ED",
                      color: "white",
                      margin: "10px 0",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  >
                    <ListItemText
                      sx={{
                        color: "white",
                      }}
                      primary={event.title}
                      secondary={
                        <Typography
                          variant="body2"
                          color="white"
                          sx={{ fontSize: "0.75rem" }}
                        >
                          {formatDate(event.start, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}

        {/* Calendar */}
        <Box flex="1 1 85%" ml={viewMode === "Events" ? "15px" : "0"}>
          <FullCalendar
            height="100%"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={viewMode === "Events" ? [...holidayEvents, ...events] : []}
            eventDrop={handleEventDrop}
            eventDragStart={handleEventDrag}
          />
        </Box>
      </Box>

      {/* Modal for creating event */}
      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>Create Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Event Title"
            type="text"
            fullWidth
            variant="standard"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEvent} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar;
