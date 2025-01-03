import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Grid, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const CEODashboard = () => {
  const [teams] = useState([
    {
      id: 1,
      teamName: "Team John Doe",
      employees: [
        { id: 1, name: "John Doe", role: "CEO", status: "Active" },
        { id: 2, name: "Jane Smith", role: "Manager", status: "Inactive" },
      ],
    },
    {
      id: 2,
      teamName: "Team Jessica Lee",
      employees: [
        { id: 3, name: "Jessica Lee", role: "Manager", status: "Active" },
        { id: 4, name: "Michael Scott", role: "Employee", status: "Active" },
      ],
    },
  ]);

  const filteredTeams = teams; // Apply any filtering logic if needed

  // Prepare data for the team summary
  const teamRows = filteredTeams.map((team) => ({
    id: team.id,
    teamName: team.teamName,
    employeeCount: team.employees.length,
  }));

  // Prepare employee data for the employee summary
  const employeeRows = teams.flatMap((team) =>
    team.employees.map((employee) => ({
      id: employee.id,
      name: employee.name,
      role: employee.role,
      status: employee.status,
    }))
  );

  const teamColumns = [
    { field: "teamName", headerName: "Team Name", width: 250 },
    { field: "employeeCount", headerName: "Employee Count", width: 150 },
  ];

  const employeeColumns = [
    { field: "name", headerName: "Employee Name", width: 150 },
    { field: "role", headerName: "Role", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
  ];

  // Helper function to create a card with a drop shadow
  const createCard = (value, label) => (
    <Card
      sx={{
        minWidth: 300,
        boxShadow: 10,
        marginTop: "4rem",
        borderRadius: "10px",
      }}
    >
      <CardContent>
        <Typography variant="h4" component="div" textAlign="center">
          {value}
        </Typography>
        <Typography color="text.secondary" textAlign="center">
          {label}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ padding: "1rem" }}>
      {/* Cards Section */}
      <Box display="flex" justifyContent="center" alignItems="center" gap={5}>
        {createCard("48", "Total Employee")}
        {createCard("10", "Active Today")}
        {createCard("0", "Leave Request")}
      </Box>

      {/* Team Summary Section */}
      <Box sx={{ marginTop: "3rem" }}>
        <Typography variant="h5" sx={{ marginBottom: "1rem", color: "blue" }}>
          Team Summary
        </Typography>

        {/* Grid to align the two sections horizontally */}
        <Grid container spacing={5} sx={{ width: "100%" }}>
          {/* Team Data Grid */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ padding: "1rem" }}>
              <DataGrid
                rows={teamRows}
                columns={teamColumns}
                disableSelectionOnClick
                disableColumnMenu
                hideFooter
                autoHeight
              />
            </Paper>
          </Grid>

          {/* Employee Data Grid */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ color: "blue" }}>
              Employee Summary
            </Typography>
            <Paper
              elevation={2}
              sx={{
                padding: "1rem",
                maxHeight: 200, // Max height for the Paper box
                overflowY: "auto", // Enable vertical scroll if content overflows
              }}
            >
              <DataGrid
                rows={employeeRows}
                columns={employeeColumns}
                disableSelectionOnClick
                disableColumnMenu
                hideFooter
                autoHeight
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CEODashboard;
