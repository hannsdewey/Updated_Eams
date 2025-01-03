import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const CEOManageTeam = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(null); // Track the type of modal
  const [newTeamName, setNewTeamName] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [teams, setTeams] = useState([
    {
      id: 1,
      teamName: "Team John Doe",
      manager: "John Doe",
      employees: [
        { id: 1, name: "John Doe", role: "CEO", status: "Active" },
        { id: 2, name: "Jane Smith", role: "Manager", status: "Inactive" },
      ],
    },
    {
      id: 2,
      teamName: "Team Jessica Lee",
      manager: "Jessica Lee",
      employees: [
        { id: 3, name: "Jessica Lee", role: "Manager", status: "Active" },
        { id: 4, name: "Michael Scott", role: "Employee", status: "Active" },
      ],
    },
  ]);

  const allEmployees = [
    {
      id: 5,
      name: "Mike Tyson",
      role: "Employee",
      status: "Active",
      team: null,
    },
    {
      id: 6,
      name: "Sarah Connor",
      role: "Employee",
      status: "Active",
      team: null,
    },
    {
      id: 7,
      name: "Bruce Wayne",
      role: "Employee",
      status: "Inactive",
      team: null,
    },
    // More employees...
  ];

  // Filter teams by search text
  const filteredTeams = teams.filter((team) =>
    team.teamName.toLowerCase().includes(searchText.toLowerCase())
  );

  // Filter employees who are not in any team
  const availableEmployeesList = allEmployees.filter(
    (employee) => employee.team === null
  );

  // Set the first team as the default selected team
  useEffect(() => {
    if (filteredTeams.length > 0) {
      setSelectedTeam(filteredTeams[0]);
    }
    setAvailableEmployees(availableEmployeesList);
  }, [filteredTeams]);

  // Handle team selection
  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  // Handle adding an employee to a team
  const handleAddEmployee = () => {
    // Add selected employees to the selected team
    const updatedTeams = teams.map((team) =>
      team.id === selectedTeam.id
        ? { ...team, employees: [...team.employees, ...selectedEmployees] }
        : team
    );

    // Update the teams state with the new employee additions
    setTeams(updatedTeams);

    // Mark the employees as added to a team (i.e., they now have a team)
    const updatedEmployees = allEmployees.map((employee) =>
      selectedEmployees.some((emp) => emp.name === employee.name)
        ? { ...employee, team: selectedTeam.teamName }
        : employee
    );

    // Update the allEmployees state with the updated team assignments
    setAvailableEmployees(updatedEmployees.filter((emp) => emp.team === null));

    // Close the modal after adding the employees
    handleCloseModal();
  };

  // Open modal for adding employee
  const handleOpenModal = (type) => {
    setModalType(type);
    setOpenModal(true);
  };

  // Handle creating a new team
  const handleCreateTeam = () => {
    // Open modal for creating a team
    setModalType("createTeam");
    setOpenModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEmployees([]); // Reset selected employees
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      marginTop="3rem"
      sx={{ width: "100%", padding: "0 1rem" }}
    >
      {/* Title and Subtitle */}
      <Typography variant="h4" component="h1" color="blue" fontWeight="bold">
        Manage Team
      </Typography>
      <Typography
        variant="subtitle2"
        component="p"
        color="blue"
        marginLeft="0.2rem"
      >
        Manage and organize your teams and employees.
      </Typography>

      {/* Search Bar and Create Team Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // Align to the right
          alignItems: "center",
          marginTop: "1rem",
          width: "100%",
        }}
      >
        <TextField
          label="Search by Team"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ width: "250px", marginRight: "10px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <i className="fas fa-search"></i>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginLeft: "10px" }}
          onClick={handleCreateTeam} // Create Team button functionality
        >
          Create Team
        </Button>
      </Box>

      {/* Teams Grid */}
      <Grid container spacing={2} sx={{ marginTop: "1rem", width: "100%" }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ padding: "1rem" }}>
            <DataGrid
              rows={filteredTeams.map((team) => ({
                id: team.id,
                teamName: team.teamName,
                employeeCount: team.employees.length,
              }))}
              columns={[
                { field: "teamName", headerName: "Team Name", width: 250 },
                {
                  field: "employeeCount",
                  headerName: "Employee Count",
                  width: 150,
                },
              ]}
              onRowClick={(param) =>
                handleTeamSelect(teams.find((team) => team.id === param.row.id))
              }
              autoHeight
            />
          </Paper>
        </Grid>

        {/* Team Details Section */}
        {selectedTeam && (
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ padding: "1rem", height: "100%" }}>
              {/* Align Team Name and Add Employee Button */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="h6"
                  component="h2"
                  color="blue"
                  fontWeight="bold"
                >
                  {selectedTeam.teamName}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenModal("addEmployee")}
                  sx={{ marginBottom: "1rem" }}
                >
                  Add Employee
                </Button>
              </Box>

              <Typography variant="body2" component="p">
                Total Employees: {selectedTeam.employees.length}
              </Typography>

              {/* Scrollable Employee List */}
              <Box
                sx={{
                  marginTop: "1rem",
                  maxHeight: "110px",
                  overflowY: "auto",
                }}
              >
                {selectedTeam.employees.map((employee) => (
                  <Box
                    key={employee.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <Typography variant="body2" component="p">
                      {employee.name} - {employee.role} ({employee.status})
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Add Employee Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          {modalType === "createTeam"
            ? "Create New Team"
            : "Add Employees to Team"}
        </DialogTitle>
        <DialogContent>
          {modalType === "createTeam" ? (
            <>
              {/* Form for creating a new team */}
              <TextField
                label="Team Name"
                fullWidth
                variant="outlined"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                sx={{ marginBottom: "1rem" }}
              />
              {/* Select Manager */}
              <FormControl fullWidth>
                <InputLabel>Manager</InputLabel>
                <Select
                  value={selectedManager}
                  onChange={(e) => setSelectedManager(e.target.value)}
                  label="Manager"
                >
                  {availableEmployees.map((employee) => (
                    <MenuItem key={employee.id} value={employee.name}>
                      {employee.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : (
            <>
              {/* Select Employees */}
              <FormControl fullWidth>
                <InputLabel>Employees</InputLabel>
                <Select
                  multiple
                  value={selectedEmployees}
                  onChange={(e) => setSelectedEmployees(e.target.value)}
                  label="Employees"
                  renderValue={(selected) => selected.join(", ")}
                >
                  {availableEmployees.map((employee) => (
                    <MenuItem key={employee.id} value={employee}>
                      <Checkbox
                        checked={selectedEmployees.indexOf(employee) > -1}
                      />
                      <ListItemText primary={employee.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button
            onClick={
              modalType === "createTeam" ? handleCreateTeam : handleAddEmployee
            }
            color="primary"
          >
            {modalType === "createTeam" ? "Create Team" : "Add Employees"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CEOManageTeam;
