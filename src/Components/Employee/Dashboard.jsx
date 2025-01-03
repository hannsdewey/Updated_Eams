import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import BarChartComponent from "./Barchart"; // Ensure the path is correct
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AttendanceGrid from "./AttendanceGrid"; // Adjust path

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState("Clock In");

  // Update time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();

  // Toggle Clock In/Out status
  const toggleStatus = () => {
    setStatus((prevStatus) =>
      prevStatus === "Clock In" ? "Clock Out" : "Clock In"
    );
  };

  const events = [
    { title: "Team Meeting", start: "2024-12-18", backgroundColor: "#6495ED" },
    {
      title: "Project Deadline",
      start: "2024-12-20",
      backgroundColor: "#FFA726",
    },
    { title: "Holiday Party", start: "2024-12-25", backgroundColor: "#32CD32" },
  ];

  return (
    <Box padding="5px" marginTop="3rem" width="95%">
      {/* Dashboard Header */}
      <Box
        bgcolor="#f8f9fa"
        padding="15px 20px"
        marginBottom="30px"
        borderRadius="8px"
        boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5" fontWeight="bold" margin={0}>
              Hello, John Doe
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              sx={{ marginTop: "5px" }}
            >
              Welcome back to the Raddacon Call Center
            </Typography>
          </Grid>
          <Grid
            item
            display="flex"
            alignItems="center"
            gap="20px"
            flexWrap="nowrap"
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ margin: 0, textAlign: "right" }}
              >
                {formattedTime}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ textAlign: "right" }}
              >
                {formattedDate}
              </Typography>
            </Box>
            <Box
              onClick={toggleStatus}
              padding="10px 20px"
              bgcolor={status === "Clock In" ? "#4caf50" : "#f44336"}
              color="white"
              borderRadius="5px"
              fontSize="14px"
              fontWeight="bold"
              textAlign="center"
              sx={{
                cursor: "pointer",
                minWidth: "120px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {status}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Top Section: Bar Chart and Calendar */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            bgcolor="#fff"
            padding="20px"
            borderRadius="8px"
            boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
            sx={{
              maxWidth: "100%", // Prevent overflow
              height: "400px", // Fixed height for Bar Chart box
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              marginBottom="15px"
              textAlign="center"
            >
              Monthly Performance
            </Typography>
            <BarChartComponent />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            bgcolor="#fff"
            padding="30px"
            borderRadius="8px"
            boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
            sx={{
              maxWidth: "100%",
              height: "400px", // Fixed height for Calendar box
              overflowY: "auto", // Enable vertical scrolling
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              marginBottom="15px"
              textAlign="center"
            >
              Calendar
            </Typography>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
              contentHeight="auto"
            />
          </Box>
        </Grid>
      </Grid>

      {/* Bottom Section: Attendance Summary */}
      <Box
        mt={4}
        bgcolor="white"
        borderRadius="8px"
        padding="25px"
        boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
        sx={{
          maxWidth: "100%", // Prevent overflow
          height: "350px", // Fixed height for Attendance box
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          marginBottom="15px"
          textAlign="center"
        >
          Attendance Summary
        </Typography>
        <AttendanceGrid />
      </Box>
    </Box>
  );
};

export default Dashboard;
