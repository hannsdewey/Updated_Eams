import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextareaAutosize,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./CEOManageUser.css"; // Correct relative import

// Function to generate random username and password
const generateUsername = (name) => {
  return `${name.split(" ")[0].toLowerCase()}_${Math.floor(
    Math.random() * 1000
  )}`;
};

const generatePassword = () => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

const CEOManageUser = () => {
  const [searchText, setSearchText] = useState("");
  const [openModal, setOpenModal] = useState(false); // First Modal (Create Account)
  const [openResultModal, setOpenResultModal] = useState(false); // Second Modal (Display Generated Details)
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    role: "", // Empty initially
    status: "Active",
  });
  const [generatedUsername, setGeneratedUsername] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "dateadded", headerName: "Date Added", width: 250 },
    {
      field: "role",
      headerName: "Role",
      width: 150,
    },
    { field: "status", headerName: "Status", width: 150 },
  ];

  const rows = [
    {
      id: 1,
      name: "John Doe",
      dateadded: "Dec 19, 2024",
      role: "CEO",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      dateadded: "Dec 19, 2024",
      role: "MANAGER",
      status: "Inactive",
    },
  ];

  // Filter rows based on the search text
  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleCreateAccount = () => {
    // Generate username and password based on details
    const username = generateUsername(userDetails.name);
    const password = generatePassword();
    setGeneratedUsername(username);
    setGeneratedPassword(password);

    // Normally, here you would send the details to your server to create the account
    // For this example, we just close the modal and show generated details
    setUserDetails({ name: "", email: "", role: "", status: "Active" });

    // Close first modal and show result modal
    handleCloseModal();
    setOpenResultModal(true);
  };

  const handleCloseResultModal = () => setOpenResultModal(false);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      marginTop="3rem"
      sx={{ width: "100%" }}
    >
      {/* Title and Create Account Button aligned horizontally */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center", // Vertically align items in the center
          marginBottom: "1rem",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            color="blue"
            fontWeight="bold"
          >
            Manage User
          </Typography>
          <Typography
            variant="subtitle2"
            component="p"
            color="blue"
            marginLeft="0.2rem"
          >
            User's Management
          </Typography>
        </Box>

        {/* Create Account Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontSize: "12px", // Smaller button size
            padding: "6px 12px", // Adjust padding for smaller button
          }}
          onClick={handleOpenModal}
        >
          Create Account
        </Button>
      </Box>

      {/* Search Bar, Filters, and Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", // Space between items (left and right)
          width: "100%",
          marginTop: "1rem",
        }}
      >
        {/* "All Users" label aligned to the left */}
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Typography variant="body1" component="p">
            All Users ({filteredRows.length})
          </Typography>
        </Box>

        {/* Search Bar aligned to the right */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Search by Name"
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
          <Button variant="outlined" color="primary">
            Edit
          </Button>
        </Box>
      </Box>

      {/* Data Grid */}
      <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
        <Grid item xs={12}>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={filteredRows} // Display filtered rows
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              autoHeight
            />
          </Box>
        </Grid>
      </Grid>

      {/* Modal for Creating Account */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Create Account</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              margin="normal"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
            />
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
            {/* Role Selection (Manager or Employee) */}
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                value={userDetails.role}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, role: e.target.value })
                }
                fullWidth
              >
                <MenuItem value="MANAGER">Manager</MenuItem>
                <MenuItem value="EMPLOYEE">Employee</MenuItem>
              </Select>
            </FormControl>
            <TextareaAutosize
              minRows={3}
              placeholder="Additional Notes"
              style={{ width: "100%", marginTop: "10px", padding: "8px" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateAccount} color="primary">
            Create Account
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal for Displaying Generated Username and Password */}
      <Dialog open={openResultModal} onClose={handleCloseResultModal}>
        <DialogTitle>Account Created</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Generated Account Details</Typography>
          <Typography>
            <strong>Username:</strong> {generatedUsername}
          </Typography>
          <Typography>
            <strong>Password:</strong> {generatedPassword}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResultModal} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CEOManageUser;
