import React from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data for leave status and trends
const leaveStatusData = [
  { status: "Approved", count: 35 },
  { status: "Rejected", count: 10 },
  { status: "Pending", count: 20 },
];

const leaveTrendsData = [
  { month: "Jan", approved: 15, rejected: 5, pending: 10 },
  { month: "Feb", approved: 20, rejected: 3, pending: 12 },
  { month: "Mar", approved: 18, rejected: 4, pending: 8 },
  { month: "Apr", approved: 22, rejected: 6, pending: 15 },
  { month: "May", approved: 30, rejected: 8, pending: 10 },
];

// Sample data for team attendance
const teamAttendanceData = [
  { month: "Jan", attendance: 90 },
  { month: "Feb", attendance: 85 },
  { month: "Mar", attendance: 88 },
  { month: "Apr", attendance: 92 },
  { month: "May", attendance: 94 },
];

const CEOReport = () => {
  // Function to trigger the print dialog
  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ padding: "2rem", marginTop: "2rem" }}>
      {/* Container for title and print button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="blue">
          CEO Report Dashboard
        </Typography>
        <Button variant="contained" color="primary" onClick={handlePrint}>
          Print Report
        </Button>
      </Box>

      <Typography
        variant="subtitle2"
        color="blue"
        sx={{ marginBottom: "2rem" }}
      >
        Overview of leave request statistics and trends.
      </Typography>

      <Grid container spacing={3}>
        {/* Bar Chart for Leave Status */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: "1rem" }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="blue"
              sx={{ marginBottom: "1rem" }}
            >
              Leave Status Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leaveStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Line Chart for Leave Trends */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: "1rem" }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="blue"
              sx={{ marginBottom: "1rem" }}
            >
              Leave Requests Trends Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={leaveTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="approved" stroke="#82ca9d" />
                <Line type="monotone" dataKey="rejected" stroke="#ff7300" />
                <Line type="monotone" dataKey="pending" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Bar Chart for Team Attendance Per Year */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: "1rem" }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="blue"
              sx={{ marginBottom: "1rem" }}
            >
              Team Attendance Per Year
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamAttendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="attendance" fill="#82ca9d" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CEOReport;
