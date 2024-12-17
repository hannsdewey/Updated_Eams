import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
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
  // New Doughnut chart data for Shifts Overview
  const newDoughnutData = {
    labels: ["Active Shifts", "Leave Shifts", "Absent", "Overtime"],
    datasets: [
      {
        data: [260, 125, 54, 146],
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dee2e6"], // Colors
        borderColor: "transparent",
      },
    ],
  };

  // New Doughnut chart data for Leave Status Breakdown
  const leaveStatusData = {
    labels: ["Sick Leave", "Vacation", "Personal Leave", "Unpaid Leave"],
    datasets: [
      {
        data: [45, 60, 30, 10],
        backgroundColor: ["#FF5733", "#33FF57", "#F1C40F", "#BDC3C7"], // Colors
        borderColor: "transparent",
      },
    ],
  };

  // Bar chart data for Work Hour Distribution (Categorized by Employees)
  const workHourData = {
    labels: [
      "Employee A",
      "Employee B",
      "Employee C",
      "Employee D",
      "Employee E",
    ],
    datasets: [
      {
        label: "Regular Hours",
        data: [160, 145, 180, 165, 155], // Example regular hours for each employee
        backgroundColor: "#4CAF50", // Green color for regular hours
      },
      {
        label: "Overtime",
        data: [15, 20, 10, 25, 30], // Example overtime hours for each employee
        backgroundColor: "#FF9800", // Orange color for overtime
      },
      {
        label: "Sick Leave",
        data: [5, 0, 2, 1, 0], // Example sick leave hours
        backgroundColor: "#FF5733", // Red for sick leave
      },
      {
        label: "Vacation",
        data: [8, 5, 10, 12, 6], // Example vacation hours
        backgroundColor: "#33FF57", // Green for vacation
      },
      {
        label: "Unpaid Leave",
        data: [2, 0, 1, 0, 3], // Example unpaid leave hours
        backgroundColor: "#F1C40F", // Yellow for unpaid leave
      },
    ],
  };

  const doughnutOptions = {
    maintainAspectRatio: false,
    cutout: "65%", // Equivalent to cutoutPercentage: 65
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Work Hour Distribution",
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
          stepSize: 20, // Adjust the step size for the Y-axis
        },
      },
    },
  };

  return (
    <Box p={1} bgcolor="#F9FAFC" marginTop="3rem">
      {/* Attendance Title and Subtitle */}
      <Typography variant="h4" component="h1" color="blue" fontWeight="bold">
        Attendance
      </Typography>
      <Typography
        variant="subtitle2"
        component="p"
        color="blue"
        marginBottom="1.5rem"
      >
        Your summary and history
      </Typography>

      <Grid container spacing={3}>
        {/* Doughnut Chart Section for Shifts Overview */}
        <Grid item xs={12} md={6}>
          <Paper elevation={8} sx={{ padding: "30px", borderRadius: "8px" }}>
            {/* Title Section */}
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

            {/* Chart and Data Section */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              height="150px"
            >
              {/* Data (Left Side) */}
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#007bff",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Active Shifts: 260
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#28a745",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Leave Shifts: 125
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#ffc107",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
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

              {/* Doughnut Chart (Right Side) */}
              <Box sx={{ width: "40%", height: "100%" }}>
                <Doughnut data={newDoughnutData} options={doughnutOptions} />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Doughnut Chart Section for Leave Status Breakdown */}
        <Grid item xs={12} md={6}>
          <Paper elevation={8} sx={{ padding: "30px", borderRadius: "8px" }}>
            {/* Title Section */}
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

            {/* Chart and Data Section */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              height="150px"
            >
              {/* Data (Left Side) */}
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#FF5733",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Sick Leave: 45
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#33FF57",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Vacation: 60
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#F1C40F",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Personal Leave: 30
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#BDC3C7",
                    fontWeight: "bold",
                  }}
                >
                  Unpaid Leave: 10
                </Typography>
              </Box>

              {/* Doughnut Chart (Right Side) */}
              <Box sx={{ width: "40%", height: "100%" }}>
                <Doughnut data={leaveStatusData} options={doughnutOptions} />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Work Hour Distribution Bar Chart */}
      <Grid container spacing={3} marginTop="2rem">
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: "20px", borderRadius: "8px" }}>
            {/* Title Section */}
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Work Hour Distribution
            </Typography>

            {/* Bar Chart */}
            <Box sx={{ height: "300px" }}>
              <Bar data={workHourData} options={barOptions} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportGraphs;
