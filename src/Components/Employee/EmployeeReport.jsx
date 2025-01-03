import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  ButtonGroup,
} from "@mui/material";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  Title,
  LinearScale,
} from "chart.js";

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  Title,
  LinearScale
);

const ReportGraphs = () => {
  const [viewMode, setViewMode] = useState("year"); // Toggle between views

  // Mock attendance data for the year
  const attendanceData = {
    year: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Active Shifts",
          data: [22, 20, 23, 21, 24, 26, 25, 27, 23, 22, 20, 21],
          backgroundColor: "#007bff",
        },
        {
          label: "Leave Shifts",
          data: [5, 4, 6, 5, 7, 8, 6, 5, 6, 5, 4, 6],
          backgroundColor: "#28a745",
        },
        {
          label: "Absent",
          data: [2, 1, 3, 2, 1, 0, 2, 3, 1, 2, 1, 3],
          backgroundColor: "#ffc107",
        },
        {
          label: "Overtime",
          data: [10, 12, 15, 14, 16, 18, 17, 20, 15, 14, 12, 13],
          backgroundColor: "#dee2e6",
        },
      ],
    },
    month: {
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
      datasets: [
        {
          label: "Active Shifts",
          data: Array.from(
            { length: 30 },
            () => Math.floor(Math.random() * 2) + 20
          ),
          backgroundColor: "#007bff",
        },
        {
          label: "Leave Shifts",
          data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 2)),
          backgroundColor: "#28a745",
        },
        {
          label: "Absent",
          data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1)),
          backgroundColor: "#ffc107",
        },
        {
          label: "Overtime",
          data: Array.from(
            { length: 30 },
            () => Math.floor(Math.random() * 5) + 10
          ),
          backgroundColor: "#dee2e6",
        },
      ],
    },
  };

  const doughnutData = {
    labels: ["Active Shifts", "Leave Shifts", "Absent", "Overtime"],
    datasets: [
      {
        data: [260, 125, 54, 146],
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dee2e6"],
        borderColor: "transparent",
      },
    ],
  };

  const leaveStatusData = {
    labels: ["Sick Leave", "Vacation", "Personal Leave", "Unpaid Leave"],
    datasets: [
      {
        data: [45, 60, 30, 10],
        backgroundColor: ["#FF5733", "#33FF57", "#F1C40F", "#BDC3C7"],
        borderColor: "transparent",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Work Hour Distribution (${
          viewMode.charAt(0).toUpperCase() + viewMode.slice(1)
        })`,
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        stacked: true, // Stacked bar chart
      },
      y: {
        beginAtZero: true,
        stacked: true, // Stack the bars
        ticks: {
          stepSize: 10, // Adjust the step size for the Y-axis
        },
      },
    },
  };

  const doughnutOptions = {
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <Box p={1} bgcolor="#F9FAFC" marginTop="3rem">
      {/* Attendance Title and Subtitle */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" component="h1" color="blue" fontWeight="bold">
          Report
        </Typography>

        {/* Print Report Button */}
        <Button
          variant="outlined"
          sx={{
            backgroundColor: "white",
            borderColor: "blue",
            color: "blue",
            borderWidth: "2px",
            padding: "3px 10px",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          Print Report
        </Button>
      </Box>
      <Typography
        variant="subtitle2"
        component="p"
        color="blue"
        marginBottom="1.5rem"
      >
        Charts and Graphs
      </Typography>

      <Grid container spacing={3}>
        {/* Doughnut Chart Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={8} sx={{ padding: "30px", borderRadius: "8px" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography variant="h6" fontWeight="bold">
                Shifts Overview
              </Typography>
              <Typography variant="body2" color="textSecondary">
                October, 2024 ▼
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" height="150px">
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#007bff", fontWeight: "bold", mb: 1 }}
                >
                  Active Shifts: 260
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#28a745", fontWeight: "bold", mb: 1 }}
                >
                  Leave Shifts: 125
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#ffc107", fontWeight: "bold", mb: 1 }}
                >
                  Absent: 54
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#dee2e6", fontWeight: "bold" }}
                >
                  Overtime: 146
                </Typography>
              </Box>
              <Box sx={{ width: "40%", height: "100%" }}>
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Leave Status Doughnut Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={8} sx={{ padding: "30px", borderRadius: "8px" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography variant="h6" fontWeight="bold">
                Leave Status Breakdown
              </Typography>
              <Typography variant="body2" color="textSecondary">
                October, 2024 ▼
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" height="150px">
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#FF5733", fontWeight: "bold", mb: 1 }}
                >
                  Sick Leave: 45
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#33FF57", fontWeight: "bold", mb: 1 }}
                >
                  Vacation: 60
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#F1C40F", fontWeight: "bold", mb: 1 }}
                >
                  Personal Leave: 30
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#BDC3C7", fontWeight: "bold" }}
                >
                  Unpaid Leave: 10
                </Typography>
              </Box>
              <Box sx={{ width: "40%", height: "100%" }}>
                <Doughnut data={leaveStatusData} options={doughnutOptions} />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Work Hour Distribution Bar Chart with Toggle */}
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{ padding: "40px", borderRadius: "8px", marginTop: "2rem" }}
          >
            {/* Title Section */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight="bold">
                Work Hour Distribution
              </Typography>

              {/* View Mode Toggle */}
              <ButtonGroup variant="contained" size="small">
                <Button
                  onClick={() => setViewMode("day")}
                  disabled={viewMode === "day"}
                >
                  Day
                </Button>
                <Button
                  onClick={() => setViewMode("week")}
                  disabled={viewMode === "week"}
                >
                  Week
                </Button>
                <Button
                  onClick={() => setViewMode("month")}
                  disabled={viewMode === "month"}
                >
                  Month
                </Button>
                <Button
                  onClick={() => setViewMode("year")}
                  disabled={viewMode === "year"}
                >
                  Year
                </Button>
              </ButtonGroup>
            </Box>

            {/* Bar Chart */}
            <Box
              sx={{
                height: "300px",
                display: "flex",
                justifyContent: "center", // Centering horizontally
                alignItems: "center", // Centering vertically
              }}
            >
              <Bar
                data={
                  viewMode === "year"
                    ? attendanceData.year
                    : attendanceData.month
                }
                options={barOptions}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportGraphs;
